import _ from "lodash";

export default function(listOfAwards){
  return _.reduce(listOfAwards, (sum, award) => {
    return sum + _.toInteger(award.current_total_value_of_award);
  }, 0);
}

