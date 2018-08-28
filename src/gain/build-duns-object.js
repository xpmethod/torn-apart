import _ from "lodash";
import awardsValue from "./awards-value";

export default function(awards) {
  return {
    contractors: _(awards)
      .uniqBy("recipient_parent_duns")
      .value()
      .map(contractor => contractor.recipient_parent_duns),
    count: _.uniqBy(awards, "recipient_parent_duns").length,
    value: awardsValue(awards)
  };
}
