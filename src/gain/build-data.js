import { readFile } from "fs";
import path from "path";
import parse from "csv-parse";
import { stdout } from "process";
import _ from "lodash";

readFile(path.join("data", "test.csv"), (err, data) => {
  if(err) throw err;

  // stdout.write("Going to parse \n");

  parse(data, { columns: true }, (err, awards) => {
    if(err) throw err;

    // stdout.write("hi\n");
    // stdout.write(`${awards.length}\n`);

    const uniques = {};
    _.keys(awards[0]).forEach(key => {
      uniques[key] = _.uniqBy(awards, key).length;
    });
    stdout.write(JSON.stringify(uniques, null, 2));



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

    const female = {
      count: _.uniqBy(femaleAward, "recipient_parent_name").length,
      value: _.reduce(femaleAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award), 0)
    };
    const black = {
      count: _.uniqBy(blackAward, "recipient_name").length,
      value: _.reduce(blackAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award))
    };
    const hispanic = {
      count: _.uniqBy(hispanicAward, "recipient_name").length,
      value: _.reduce(hispanicAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award))
    };
    const saaia = {
      count: _.uniqBy(saaiaAward, "recipient_name").length,
      value: _.reduce(saaiaAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award))
    };
    const asianPacific = {
      count: _.uniqBy(asianPacificAward, "recipient_name").length,
      value: _.reduce(asianPacificAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award))
    };
    const minority = {
      count: _.uniqBy(minorityAward, "recipient_name").length,
      value: _.reduce(minorityAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award))
    };
    const otherMinority = {
      count: _.uniqBy(otherMinorityAward, "recipient_name").length,
      value: _.reduce(otherMinorityAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award))
    };
    const alaskan = {
      count: _.uniqBy(alaskanAward, "recipient_name").length,
      value: _.reduce(alaskanAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award))
    };
    const native = {
      count: _.uniqBy(nativeAward, "recipient_name").length,
      value: _.reduce(nativeAward, (sum, award) => sum + _.toInteger(award.current_total_value_of_award))
    };

    const intersectional = _.map(female, company => {
      _.each([ black, hispanic, saaia, asianPacific, minority, otherMinority, alaskan, native ], group => {
        const filter = _.find(group, company);
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


    // stdout.write(JSON.stringify(female, null, 2));
    // stdout.write("\n");

    // _.each([ female, black, hispanic, saaia, asianPacific, minority, otherMinority, alaskan, native ], (group, i) => {
    //   stdout.write(`id: ${i}, count: ${group.count}\n`);
    // });

    stdout.write("Intersectional", intersectional.length);

  });
});
