//import _ from "lodash";
//import graph from "../../data/explorer/graph.json";

export default function(d){
  //const parentCompany = _.find(graph.links, link => link.target.name === d.name);
  //console.log(parentCompany);
  return `<p><h4><b>Product Category:</b>
  <br><br>${d.name}`;
}
