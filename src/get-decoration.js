import _ from "lodash";
import parse from "csv-parse/lib/sync";
import { readFileSync } from "fs";
import path from "path";
// import Decorations from "../data/vendor_decorations.csv";

export default function(duns) {
  const Decorations = parse(
    readFileSync(path.join("data", "vendor_decorations.csv")),
    { columns: true }
  );
  const company = _.find(Decorations, { duns });
  if (company) {
    return company.cleanName;
  } else {
    throw duns;
  }
}
