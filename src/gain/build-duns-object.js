import _ from "lodash";

export default function(awards){
  return {
    companies: _(awards).uniqBy("recipient_parent_duns").value().map(company => company.recipient_parent_duns),
    count: _.uniqBy(awards, "recipient_parent_duns").length,
    value: _.reduce(awards, (sum, award) => sum + _.toInteger(award.current_total_value_of_award), 0)
  };
}

