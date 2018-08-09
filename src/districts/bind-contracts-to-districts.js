import { readFileSync } from "fs";
import { writeFile } from "fs";
import { stdout } from "process";
import path from "path";
import parse from "csv-parse/lib/sync";
import stringify from "csv-stringify";
import _ from "lodash";

const contracts = parse(
  readFileSync(path.join("data", "districts", "thin_contracts.csv")),
  { columns: true });
const districts = parse(
  readFileSync(path.join("data", "districts", "thin_districts.csv")),
  { columns: true });
// console.log(JSON.stringify(contracts, null, 2));
_.each(districts, district => {
  district.total_awards = 0;
  district.awards = _.filter(contracts, contract => contract.companyCongCode === district.id2);
  district.perfAwards = _.filter(contracts, contract => contract.performanceCongCode === district.id2);
  _.each([13, 14, 15, 16, 17, 18], year => {
    district[`fy${year}`] = _(district.awards)
      .filter(award => award.fiscalYear === `20${year}`)
      .reduce((sum, award) => {
        let value = parseFloat(award.currentValue);
        if(value <= 0) value = 0;
        return sum + value;
      }, 0);
    district.total_awards = district.total_awards + district[`fy${year}`];
  });
});
stringify(districts, 
  { header: true,
    columns: [
      "id",
      "id2",
      "display_label",
      "party",
      "district_url",
      "representative",
      "representative_photo_url",
      "population",
      "population_moe",
      "households",
      "households_moe",
      "median_income_hh",
      "median_income_hh_moe",
      "fy13",
      "fy14",
      "fy15",
      "fy16",
      "fy17",
      "fy18",
      "total_awards"
    ]
  },
  (err, output) => {
    writeFile(path.join("data", "districts", "fat_districts.csv"), output, (err) => {
      if(err) throw err;
      stdout.write("WE DID THE THING 🚀\n");
    }); // close writeFile callback.
  });

// console.log(JSON.stringify(districts, null, 2));
