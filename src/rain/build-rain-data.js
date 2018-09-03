import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import { parse } from "csv";
import _ from "lodash";
import { ckmeans } from "simple-statistics";

export default function(decorations) {
  readFile(path.join("data", "follow_the_money_data.csv"), (err, data) => {
    if (err) throw err;
    parse(data, { columns: true }, (err, csvData) => {
      if (err) throw err;

      const awards = csvData; //.filter(d => d.current_total_value_of_award !== "");
      const bins = ckmeans(
        awards.map(award => {
          let value = parseFloat(award.current_total_value_of_award);
          if (_.isNaN(value)) {
            value = 0;
          }
          return value;
        }),
        5
      );
      bins.shift();
      var mapData = awards.map(award => {
        let value = parseFloat(award.current_total_value_of_award);
        if (_.isNaN(value)) {
          value = 0;
        }
        return {
          fiscalYear: award.fiscal_year,
          currentValue: award.current_total_value_of_award,
          name: _.find(decorations, { duns: award.recipient_duns }).cleanName,
          duns: award.recipient_duns,
          multiYear: "false"
        };
      });
      checkYears(mapData);
      writeFile(
        path.join("docs", "app", "data", "rain", "data.json"),
        JSON.stringify({ bins, mapData }, null, 2),
        err => {
          if (err) throw err;
          stdout.write("WE DID THE RAIN THING\n");
        }
      ); // close writeFile callback.
    }); //end parse
  });
}

function checkYears(mapData) {
  for (let i = 0; i < mapData.length; i = i + 1) {
    for (let j = 0; j < mapData.length; j = j + 1) {
      //compare every award to every other award
      if (mapData[i].duns === mapData[j].duns) {
        //if they have the same duns number
        if (mapData[i].fiscalYear !== mapData[j].fiscalYear) {
          //and they have different years
          mapData[i].multiYear = "true"; //set multiYear to true
        } //end if same year
      } //end if same dun
    } //end internal for loop
  } //end outer for loop
}
