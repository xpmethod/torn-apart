//import _ from "lodash";
//import graph from "../../data/explorer/graph.json";

export default function(d){
  //const parentCompany = _.find(graph.links, link => link.target.name === d.name);
  //console.log(parentCompany);
  //console.log(d);
  return `<p><h4>Subsidiary||Parent:<br> <br>${d.name}</h4> ${d.awards[0].recipient_city} <br> test: `;
}
