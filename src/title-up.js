import _ from "lodash";
// var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

export default function (string) {
  return _.words(string).map( word => _.capitalize(word)).join(" ");
}

