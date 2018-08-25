import _ from "lodash";
import awardsValue from "./awards-value";

export default function(awards) {
  return {
    companies: _(awards)
      .uniqBy("recipient_parent_duns")
      .value()
      .map(company => company.recipient_parent_duns),
    count: _.uniqBy(awards, "recipient_parent_duns").length,
    value: awardsValue(awards)
  };
}
