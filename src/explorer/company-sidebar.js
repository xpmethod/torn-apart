import _ from "lodash";
import graph from "../../data/explorer/graph.json";

export default function(d){
  const parentCompany = _.find(graph.links, link => link.target.name === d.name);
  console.log(parentCompany);
  return "<h2>you clicked on a company!</h2>";
}
