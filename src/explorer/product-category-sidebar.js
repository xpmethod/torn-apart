//import _ from "lodash";
//import graph from "../../data/explorer/graph.json";

export default function(d){
  //const parentCompany = _.find(graph.links, link => link.target.name === d.name);
  //console.log(parentCompany);
  return `<p><h5>Product Category</h5> <br>
   Type: ${d.name}
   <p><h5>Full Product List</h5> <br>
   <font size="1">Apparel & Leather <br>
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
