import { writeFile, readFile } from "fs";
import path from "path";
import parse from "csv-parse";
import { stdout } from "process";
import _ from "lodash";
import gainBuildDunsObject from "./build-duns-object";
import gainFindBiggestProfiteer from "./find-biggest-profiteer";
import awardsValue from "./awards-value";

export default function(){
  readFile(path.join("data", "follow_the_money_data.csv"), (err, data) => {
    if(err) throw err;
    parse(data, { columns: true }, (err, awards) => {
      if(err) throw err;
      const output = {
        totalParents: _.uniqBy(awards, "recipient_parent_duns").length,
        totalValue: awardsValue(awards),
        minorityCategories: ["black", "hispanic", "saaia",
          "asianPacific", "native", "otherMinority", "alaskan", "female"],
        minorityCompanies: {},
        intersectionalCompanies: {},
        biggestProfiteers: {}
      };

      const minorityAwards = {
        femaleAward: awards.filter(award => {
          return award.woman_owned_business === "t" ||
          award.woman_owned_small_business === "t" ||
          award.joint_venture_women_owned_small_business === "t" ||
          award.joint_venture_economic_disadvantaged_women_owned_small_bus === "t";}),
        blackAward: awards.filter(award => award.black_american_owned_business === "t"),
        hispanicAward: awards.filter(award => award.hispanic_american_owned_business === "t"),
        saaiaAward: awards.filter(award => award.subcontinent_asian_asian_indian_american_owned_business === "t"),
        asianPacificAward: awards.filter(award => award.asian_pacific_american_owned_business === "t"),
        otherMinorityAward: awards.filter(award => award.other_minority_owned_business === "t"),
        alaskanAward: awards.filter(award => award.alaskan_native_owned_corporation_or_firm === "t"),
        nativeAward: awards.filter(award => {
          return award.american_indian_owned_business === "t" ||
          award.tribally_owned_business === "t" ||
          award.native_american_owned_business === "t";
        })
      };

      const minorityCompanies = {};
      _.each(output.minorityCategories, minority => {
        minorityCompanies[minority] = gainBuildDunsObject(minorityAwards[minority + "Award"]);
        output.biggestProfiteers[minority] = gainFindBiggestProfiteer(minorityAwards[minority + "Award"]);
      });

      output.minorityCategories.pop();
      output.minorityCategories.map( group => {
        const intercompanies = _.intersection(minorityCompanies.female.companies, minorityCompanies[group].companies);
        output.intersectionalCompanies[group] = {
          count: intercompanies.length,
          value: _.reduce(intercompanies, (sum, duns) => {
            return sum + awardsValue(_.filter(awards, {"recipient_parent_duns": duns}));
          }, 0)
        };
      });
      _(minorityCompanies)
        .keys()
        .each(key => {
          output.minorityCompanies[key] = {
            count: minorityCompanies[key].count,
            value: minorityCompanies[key].value
          };
        });
      writeFile(path.join("data", "gain", "minority-data.json"), JSON.stringify(output), (err) => {
        if(err) throw err;
        stdout.write("WE DID THE GAIN THING 🚀\n");
      });
    });
  });
}
