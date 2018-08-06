//import _ from "lodash";
//import graph from "../../data/explorer/graph.json";

export default function(d){
  //const parentCompany = _.find(graph.links, link => link.target.name === d.name);
  //console.log(parentCompany);
  return `<p><h4><b>Parent Company:</b>
  <br><br>${d.name}
  <br><br><b>Total value of awards:</b>
  <br>$${d.total_value}</h4>`;
}
