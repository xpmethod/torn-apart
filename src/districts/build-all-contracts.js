import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import { parse, stringify } from "csv";
// import _ from "lodash";

readFile(path.join("data", "districts", "all_contracts.csv"), (err, data) => {
  if(err) throw err;
  parse(data, {columns: true}, (err, awards) => {
    if (err) throw err;
    stringify(
      awards.map(award => {
        return {
          awardID: award.award_id_piid,
          fiscalYear: award.fiscal_year,
          currentValue: award.current_total_value_of_award,
          potentialValue: award.potential_total_value_of_award,
          parentCompany: award.recipient_parent_name,
          childCompany: award.recipient_name,
          companyState: award.recipient_state_code,
          companyDistrict: award.recipient_congressional_district,
          performanceState: award.primary_place_of_performance_state_code,
          performanceDistrict: award.primary_place_of_performance_congressional_district
        };
      }),
      { header: true,
        columns: [
          "awardID",
          "fiscalYear",
          "currentValue",
          "potentialValue",
          "parentCompany",
          "childCompany",
          "companyState",
          "companyDistrict",
          "performanceState",
          "performanceDistrict"
        ]
      }, (err, output) => {
        if(err) throw err;
        writeFile(path.join("data", "districts", "thin_contracts.csv"),output, (err) => {
          if(err) throw err;
          stdout.write("WE DID THE THING 🚀\n");
        }); // close writeFile callback.
      });
  });
});
