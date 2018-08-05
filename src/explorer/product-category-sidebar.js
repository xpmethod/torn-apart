//import _ from "lodash";
//import graph from "../../data/explorer/graph.json";

export default function(d){
  //const parentCompany = _.find(graph.links, link => link.target.name === d.name);
  //console.log(parentCompany);
  return `<h4><br>${d.name}</h4>
   <font size="2"><b>Full Product List</b></font> <br>
   <font size="1em">Apparel & Leather <br>
   Carceral Services<br>
   Consulting<br>
   Financial<br>
   Food<br>
   Health & Personal Care<br>
   Hotels<br>
   IT<br>
   Legal<br>
   Munitions<br>
   Office Supplies<br>
   Printing & Publishing<br>
   Research & Professional Development<br>
   Retail<br>
   Sports & Rec<br>
   Telecom<br>
   Temps<br>
   Trade & Manufacturing<br>
   Transportation</font>
   `;
}
