import { select } from "d3-selection";

export default function(d){
  let html;
  switch(d.category){
  case "product":
    html = `Product: ${d.name}`;
    break;
  case "product category":
    html = `Product Category: ${d.name}`;
    break;
  case "company":
    html = `Company: ${d.name}`;
    break;
  case "parent company":
    html = `Parent Company: ${d.awards[0].parent_name} <br>
    City: ${d.awards[0].recipient_city} <br>
    Total Value: $${d.total_value}`;
    break;
  }
  select("#explorer-sidebar").html(html);
}

//${d.awards[0].parent_name} calls the data from the array w/in parent company
//nodes where it's nested (found the array by adding .each(d => console.log(d))to
//the nodes in murderboard.js so I could look at the objects in the console)
