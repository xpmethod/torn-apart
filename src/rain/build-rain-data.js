import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import { parse, stringify } from "csv";
import States from "../states";
import _ from "lodash";

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
          currentValue: award.current_total_value_of_award,
          potentialValue: award.potential_total_value_of_award,
		  name: award.recipient_name,
		  duns: award.recipient_duns,
		  parentDuns: award.recipient_parent_duns
        };
      }), // ending awards.map here, still inside stringify
      { header: true,
        columns: [
          "awardID",
          "fiscalYear",
          "currentValue",
          "potentialValue",
          "name",
          "duns",
          "parentDuns",
        ]
      }, (err, output) => {
        if(err) throw err;
        writeFile(path.join("data", "rain", "rainData.csv"),output, (err) => {
          if(err) throw err;
          stdout.write("WE DID THE THING\n");
        }); // close writeFile callback.
      }); //end stringify
  }); //end parse
});
/*
function checkYears(duns, fiscalYear){
 var multiYear = True; //by default set to true because the single-year awards are the ones that stand out, colourwise, and it's better not to create these by mistake

 return multiYear;
}
*/
