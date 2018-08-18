import _ from "lodash";
import Decorations from "../data/vendor_decorations.csv";

export default function(duns){
  const dunsInt = _.toInteger(duns);
  const company = _.find(Decorations, { "duns": dunsInt });
  if(company.url && !company.url.match(/^http/)){
    company.url = company.url.replace(/^/, "http://");
  }
  return company;
}
