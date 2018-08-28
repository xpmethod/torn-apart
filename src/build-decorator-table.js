import { writeFile, readFileSync } from "fs";
import { parse, stringify } from "csv";
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
    { columns: true }
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
              duns: a.consolidated_parent_duns,
              origName: a.recipient_name
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
          } else {
            stdout.write(`${csvVendor.duns} is not in Hoover list\n`);
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
            csvVendor.cleanName = csvVendor.vendorName || csvVendor.origName;
            csvVendor.cleanName = cleanNames(csvVendor.cleanName); //applies title case, sorts out acronyms, etc.
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
