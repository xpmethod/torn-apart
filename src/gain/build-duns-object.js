import _ from "lodash";
import awardsValue from "./awards-value";

export default function(awards) {
  return {
    contractors: _(awards)
      .uniqBy("consolidated_parent_duns")
      .value()
      .map(contractor => contractor.consolidated_parent_duns),
    count: _.uniqBy(awards, "consolidated_parent_duns").length,
    value: awardsValue(awards)
  };
}
