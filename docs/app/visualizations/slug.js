import _ from "lodash";
import slugify from "slugify";

export default function(string) {
  return slugify(
    _.chain(string)
      .toLower()
      .words()
      .value()
      .join("-")
      .replace(/\W/g, "")
  );
}
