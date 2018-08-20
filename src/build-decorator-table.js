import { writeFile, readFileSync } from "fs";
import { parse, stringify } from "csv";
import { stdout } from "process";
import path from "path";
import _ from "lodash";
import cleanNames from "./clean-names";

export default function(callback){
  const vendorData = JSON.parse(readFileSync(path.join("data", "vendor-duns-data.json"))); 
  parse(readFileSync(path.join("data", "follow_the_money_data.csv")),
    { columns: true },
    (err, awards) => {
      if (err) throw err;
      const vendors = _(awards.map(a => {
        return { duns: a.recipient_duns, origName: a.recipient_name };
      }))
        .concat(awards.map(a => {
          return { duns: a.recipient_parent_duns, origName: a.recipient_name };
        }))
        .uniqBy("duns")
        .each(csvVendor => {
          const vendor = _.find(vendorData, { "excel_duns": csvVendor.duns });
          if(!vendor){
            stdout.write(`Could not find record for ${csvVendor.duns}\n`);
          } else {
            if(vendor.sam_data){
              csvVendor.vendorName = vendor.sam_data.registration.legalBusinessName;
              csvVendor.url = vendor.sam_data.registration.corporateUrl;
            }
            return cleanNames(csvVendor);
          }
        });
      stringify(vendors, 
        { header: true,
          columns: [
            "duns",
            "cleanName",
            "vendorName",
            "origName",
            "url"
          ]
        },
        (err, output) => {
          if(err) throw err;
          writeFile(path.join("data", "vendor_decorations.csv"), output,  (err) => {
            if(err) throw err;
            stdout.write(`There are ${vendors.length} vendors\n`);
            callback(vendors);
          });
        });
    }
  );
}

