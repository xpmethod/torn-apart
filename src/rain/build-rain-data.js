import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import { parse, stringify } from "csv";
import _ from "lodash";

export default function(){
  readFile(path.join("data", "follow_the_money_data.csv"), (err, data) => {
    if(err) throw err;
    parse(data, {columns: true}, (err, awards) => {
      if (err) throw err;

      var mapData = awards.map(award => {
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
          parentDuns: award.recipient_parent_duns,
          multiYear: "false" 
        };
      });
      checkYears(mapData);

      stringify(mapData, 
        { header: true,
          columns: [
            "awardID",
            "fiscalYear",
            "currentValue",
            "potentialValue",
            "name",
            "duns",
            "parentDuns",
            "multiYear",
          ]
        }, (err, output) => {
          if(err) throw err;
          writeFile(path.join("data", "rain", "rainData.csv"),output, (err) => {
            if(err) throw err;
            stdout.write("WE DID THE RAIN THING\n");
          }); // close writeFile callback.
        }); //end stringify
    }); //end parse
  });
}

function checkYears(mapData){

  for(let i = 0; i< mapData.length; i=i+1){
    for(let j=0; j<mapData.length; j=j+1){ //compare every award to every other award
      if(mapData[i].duns === mapData[j].duns){ //if they have the same duns number
        if(mapData[i].fiscalYear !== mapData[j].fiscalYear){ //and they have different years
          mapData[i].multiYear = "true"; //set multiYear to true
        } //end if same year
      }//end if same dun
    } //end internal for loop
  } //end outer for loop
}

