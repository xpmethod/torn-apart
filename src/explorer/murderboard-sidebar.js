import { select } from "d3-selection";
// import productSidebar from "./product-sidebar";
// import productCategorySidebar from "./product-category-sidebar";
import companySidebar from "./company-sidebar";
// import parentCompanySidebar from "./parent-company-sidebar";

export default function(d){

  let html;
  switch(d.category){
  // case "product":
  //   html = productSidebar(d);
  //   break;
  // case "product category":
  //   html = productCategorySidebar(d);
  //   break;
  case "company":
    html = companySidebar(d);
    break;
  // case "parent company":
  //   html = parentCompanySidebar(d);
  //   break;
  }
  select("#explorer-sidebar").html(html);
}
