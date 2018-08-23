import _ from "lodash";
import awardsValue from "./awards-value";

export default function(awards) {
  const awardsWithMoney = _(awards)
    .uniqBy("recipient_parent_duns")
    .value()
    .map(company => {
      return {
        duns: company.recipient_parent_duns,
        value: awardsValue(
          _.filter(awards, {
            recipient_parent_duns: company.recipient_parent_duns
          })
        )
      };
    });
  return _(awardsWithMoney)
    .sortBy("value")
    .last();
}
