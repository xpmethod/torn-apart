import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import { parse, stringify } from "csv";
import States from "../states";
import _ from "lodash";

export default function(callback){
  readFile(path.join("data", "follow_the_money_data.csv"), (err, data) => {
    if(err) throw err;
    parse(data, {columns: true}, (err, awards) => {
      if (err) throw err;
      stringify(
        awards.map(award => {
          let value = parseFloat(award.current_total_value_of_award);
          if(_.isNaN(value)){ 
            value = 0;
          }
          return {
            awardID: award.award_id_piid,
            fiscalYear: award.fiscal_year,
            currentValue: value,
            potentialValue: award.potential_total_value_of_award,
            parentCompany: award.recipient_parent_name,
            childCompany: award.recipient_name,
            companyCongCode: convertToCongCode(award.recipient_state_code, award.recipient_congressional_district),
            performanceCongCode: convertToCongCode(award.primary_place_of_performance_state_code, award.primary_place_of_performance_congressional_district)
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
            "companyCongCode",
            "performanceCongCode",
          ]
        }, (err, output) => {
          if(err) throw err;
          writeFile(path.join("data", "districts", "thin_contracts.csv"),output, (err) => {
            if(err) throw err;
            stdout.write("WE DID THE THIN CONTRACTS THING 🚀\n");
            callback();
          }); // close writeFile callback.
        });
    });
  });
}

function convertToCongCode(abbreviation, district){
  const state = _.find(States, { abbreviation });
  let districtString = district.toString();
  if(districtString.length === 1) districtString = `0${districtString}`;
  if(state){
    return `${state.stateFP.replace(/^0/, "")}${districtString}`;
  } else {
    return "****";
  }
}
