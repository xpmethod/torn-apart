import { readFileSync } from "fs";
import { stdout } from "process";
import path from "path";
import parse from "csv-parse/lib/sync";
import _ from "lodash";

const awards = parse(
  readFileSync(path.join("data", "follow_the_money_data.csv")),
  { columns: true }
);
const duns = [];
_.each(awards, award => {
  let entry = _.find(duns, { duns: award.recipient_duns });
  if (entry) {
    entry.parent_duns.push(award.recipient_parent_duns);
  } else {
    duns.push({
      duns: award.recipient_duns,
      name: award.recipient_name,
      parent_duns: [award.recipient_parent_duns]
    });
  }
});
_.each(duns, dun => {
  dun.parents = _.uniq(dun.parent_duns).length;
  if (dun.parents > 1) {
    // stdout.write(JSON.stringify(dun.parent_duns));
    const pk = _.includes(dun.parent_duns, dun.duns);
    const parentKid = pk
      ? "and one parent is itself"
      : "and it did not birth itself";
    // stdout.write("\n");
    stdout.write(
      `${dun.name} (${dun.duns}) has ${dun.parents} parents, ${parentKid}.\n`
    );
  }
});
