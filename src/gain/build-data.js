import { readFile } from "fs";
import path from "path";
import parse from "csv-parse";
import { stdout } from "process";
import _ from "lodash";
import gainBuildDunsObject from "./build-duns-object";

readFile(path.join("data", "follow_the_money_data.csv"), (err, data) => {
  if(err) throw err;
  parse(data, { columns: true }, (err, awards) => {
    if(err) throw err;
    const uniques = {};
    _.keys(awards[0]).forEach(key => {
      uniques[key] = _.uniqBy(awards, key).length;
    });
    // stdout.write(JSON.stringify(uniques, null, 2));



    const femaleAward =awards.filter(award => {
      return award.woman_owned_business === "t" ||
      award.woman_owned_small_business === "t" ||
      award.joint_venture_women_owned_small_business === "t" ||
      award.joint_venture_economic_disadvantaged_women_owned_small_bus === "t";});
    const blackAward = awards.filter(award => award.black_american_owned_business === "t");
    const hispanicAward = awards.filter(award => award.hispanic_american_owned_business === "t");
    const saaiaAward = awards.filter(award => award.subcontinent_asian_asian_indian_american_owned_business === "t");
    const asianPacificAward = awards.filter(award => award.asian_pacific_american_owned_business === "t");
    const minorityAward = awards.filter(award => award.minority_owned_business === "t");
    const otherMinorityAward = awards.filter(award => award.other_minority_owned_business === "t");
    const alaskanAward = awards.filter(award => award.alaskan_native_owned_corporation_or_firm === "t");
    const nativeAward = awards.filter(award => {
      return award.american_indian_owned_business === "t" ||
      award.tribally_owned_business === "t" ||
      award.native_american_owned_business === "t";
    });

    const female = gainBuildDunsObject(femaleAward);
    const black = gainBuildDunsObject(blackAward);
    const hispanic = gainBuildDunsObject(hispanicAward);
    const saaia = gainBuildDunsObject(saaiaAward);
    const asianPacific = gainBuildDunsObject(asianPacificAward);
    const minority = gainBuildDunsObject(minorityAward);
    const otherMinority = gainBuildDunsObject(otherMinorityAward);
    const alaskan = gainBuildDunsObject(alaskanAward);
    const native = gainBuildDunsObject(nativeAward);

    stdout.write(JSON.stringify(female, null, 2));
    const intersectional = _.map(female.companies, company => {
      _.each([ black, hispanic, saaia, asianPacific, minority, otherMinority, alaskan, native ], group => {
        // stdout.write(`checking ${
        const filter = _.find(group.companies, company);
        if(filter){
          return company;
        }
      }); 
    });
      // {group: "BA", taName: "Black-American", ecount: 61, color: green},
      // {group: "HA", taName: "Hispanic-American", ecount: 57, color: orange},
      // {group: "SAAIA", taName: "Subcontinent-Asian/Asian-Indian-American", ecount: 36, color: purple},
      // {group: "AP", taName: "Asian-Pacific", ecount: 31, color: pink},
      // {group: "NA", taName: "Native-American", ecount: 21, color: lime} , 
      // {group: "OA", taName: "Other-Minority", ecount: 19, color: beige
      // },
      // {group: "AN", taName: "Alaskan-Native", ecount: 12, color: tan}
      // {group: "FEM", taName: "female", count: 184, color: purple}, 
      // {group: "NON-FEM", taName: "non-female", count: 940, color: green}
      // {group: "INT", taName: "intersectional", iCount: 77, color: purple}, 
      // {group: "NON-INT", taName: "non-intersectional", iCount: 344, color: green}

    stdout.write("Intersectional", intersectional.length);
    stdout.write("\n");
    // stdout.write(JSON.stringify(intersectional, null, 2));
    // stdout.write("\n");

  });
});
