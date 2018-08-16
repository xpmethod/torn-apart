import { readFileSync } from "fs";
import path from "path";
import parse from "csv-parse/lib/sync";
import _ from "lodash";
import writeGeoJSON from "./write-geojson";
import writeCSV from "./write-csv";

export default function(){
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
  writeGeoJSON(districts);
  writeCSV(districts);
}
