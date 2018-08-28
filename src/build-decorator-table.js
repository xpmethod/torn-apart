import { writeFile, readFileSync } from "fs";
import parse from "csv-parse";
import stringify from "csv-stringify";
import parseSync from "csv-parse/lib/sync";
import { stdout } from "process";
import path from "path";
import _ from "lodash";
import cleanNames from "./clean-names";

export default function(callback) {
  const vendorData = JSON.parse(
    readFileSync(path.join("data", "vendor-duns-data.json"))
  );
  const hooverDuns = parseSync(
    readFileSync(path.join("data", "hoovers_names_and_duns.csv")),
    { quote: "'", ltrim: true, rtrim: true, delimiter: ",", columns: true }
  );
  parse(
    readFileSync(path.join("data", "follow_the_money_data.csv")),

    { columns: true },
    (err, awards) => {
      if (err) throw err;
      const vendors = _(
        awards.map(a => {
          return { duns: a.recipient_duns, origName: a.recipient_name };
        })
      )
        .concat(
          awards.map(a => {
            return {
              duns: a.recipient_parent_duns,
              origName: a.recipient_parent_name
            };
          })
        )
        .uniqBy("duns")
        .each(csvVendor => {
          let vendor = _.find(hooverDuns, {
            duns: csvVendor.duns.padStart(9, "0")
          });
          if (vendor) {
            csvVendor.vendorName = vendor.name;
            csvVendor.cleanName = cleanNames(csvVendor.vendorName); //applies title case, sorts out acronyms, etc.
            return csvVendor;
          } else {
            // stdout.write(`${csvVendor.duns} is not in Hoover list\n`);
            vendor = _.find(vendorData, { excel_duns: csvVendor.duns });
            if (!vendor) {
              stdout.write(`Could not find record for ${csvVendor.duns}\n`);
            } else {
              if (vendor.sam_data) {
                csvVendor.vendorName =
                  vendor.sam_data.registration.legalBusinessName;
                csvVendor.url = vendor.sam_data.registration.corporateUrl;
              }
            }
            // stdout.write(`${csvVendor.vendorName} is here.`);
            csvVendor.cleanName = csvVendor.vendorName || csvVendor.origName;
            csvVendor.cleanName = cleanNames(csvVendor.cleanName); //applies title case, sorts out acronyms, etc.
            // stdout.write(` and cleanName is ${csvVendor.cleanName}\n`);
            return csvVendor;
          }
        });
      stringify(
        vendors,
        {
          header: true,
          columns: ["duns", "cleanName", "vendorName", "origName", "url"]
        },
        (err, output) => {
          if (err) throw err;
          writeFile(
            path.join("data", "vendor_decorations.csv"),
            output,
            err => {
              if (err) throw err;
              stdout.write(`There are ${vendors.length} vendors\n`);
              callback(vendors);
            }
          );
        }
      );
    }
  );
}
