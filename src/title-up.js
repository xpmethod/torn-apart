//import _ from "lodash";
import cleanNames from "./clean-names";

// var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

export default function (string) {
  return cleanNames(string);
}

