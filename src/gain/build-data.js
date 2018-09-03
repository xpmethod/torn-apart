import { writeFile, readFile } from "fs";
import path from "path";
import parse from "csv-parse";
import { stdout } from "process";
import _ from "lodash";
import gainBuildDunsObject from "./build-duns-object";
import gainFindBiggestProfiteer from "./find-biggest-profiteer";
import awardsValue from "./awards-value";

export default function(decorations) {
  readFile(path.join("data", "follow_the_money_data.csv"), (err, data) => {
    if (err) throw err;
    parse(data, { columns: true }, (err, awards) => {
      if (err) throw err;
      const output = {
        totalParents: _.uniqBy(awards, "recipient_parent_duns").length,
        totalValue: awardsValue(awards),
        minorityCategories: [
          "black",
          "hispanic",
          "saaia",
          "asianPacific",
          "native",
          "otherMinority",
          "female"
        ],
        minorityContractors: {},
        intersectionalContractors: {},
        biggestProfiteers: {}
      };

      const minorityAwards = {
        femaleAward: awards.filter(award => {
          return (
            award.woman_owned_business === "t" ||
            award.woman_owned_small_business === "t" ||
            award.joint_venture_women_owned_small_business === "t" ||
            award.joint_venture_economic_disadvantaged_women_owned_small_bus ===
              "t"
          );
        }),
        blackAward: awards.filter(
          award => award.black_american_owned_business === "t"
        ),
        hispanicAward: awards.filter(
          award => award.hispanic_american_owned_business === "t"
        ),
        saaiaAward: awards.filter(
          award =>
            award.subcontinent_asian_asian_indian_american_owned_business ===
            "t"
        ),
        asianPacificAward: awards.filter(
          award => award.asian_pacific_american_owned_business === "t"
        ),
        otherMinorityAward: awards.filter(
          award => award.other_minority_owned_business === "t"
        ),
        nativeAward: awards.filter(award => {
          return award.native_american_owned_business === "t";
        })
      };

      const minorityContractors = {};
      _.each(output.minorityCategories, minority => {
        minorityContractors[minority] = gainBuildDunsObject(
          minorityAwards[minority + "Award"]
        );
        output.biggestProfiteers[minority] = gainFindBiggestProfiteer(
          minorityAwards[minority + "Award"]
        );
        output.biggestProfiteers[minority].name = _.find(decorations, {
          duns: output.biggestProfiteers[minority].duns
        }).cleanName;
      });
      output.minorityCategories.pop();
      output.minorityCategories.map(group => {
        const intercontractors = _.intersection(
          minorityContractors.female.contractors,
          minorityContractors[group].contractors
        );
        output.intersectionalContractors[group] = {
          count: intercontractors.length,
          value: _.reduce(
            intercontractors,
            (sum, duns) => {
              return (
                sum +
                awardsValue(_.filter(awards, { recipient_parent_duns: duns }))
              );
            },
            0
          )
        };
      });
      _(minorityContractors)
        .keys()
        .each(key => {
          output.minorityContractors[key] = {
            count: minorityContractors[key].count,
            value: minorityContractors[key].value
          };
        });
      writeFile(
        path.join("docs", "app", "data", "gain", "minority.json"),
        JSON.stringify(output, null, 2),
        err => {
          if (err) throw err;
          stdout.write("WE DID THE GAIN THING 🚀\n");
        }
      );
    });
  });
}
