import { select } from "d3-selection";

export default function(d){
  let html;
  switch(d.category){
  case "product":
    html = "Product: ${d.name}";
    break;
  case "product category":
    html = "Product Category: ${d.name}";
    break;
  case "company":
    html = "Company: ${d.name}";
    break;
  case "parent company":
    html = "Parent Company: ${d.name}";
    break;
  }
  select("#explorer-sidebar").html(html);
}
