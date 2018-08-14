import { select } from "d3-selection";
import productSidebar from "./product-sidebar";
import productCategorySidebar from "./product-category-sidebar";
import companySidebar from "./company-sidebar";
import parentCompanySidebar from "./parent-company-sidebar";
import updateTexts from "../update-texts";
import murderboardLegend from "./murderboard-legend";
export default function(d){

  murderboardLegend();

  let html;
  switch(d.category){
  case "product":
    html = productSidebar(d);
    break;
  case "product category":
    html = productCategorySidebar(d);
    break;
  case "company":
    html = companySidebar(d);
    break;
  case "parent company":
    html = parentCompanySidebar(d);
    break;
  }

  select("#freezer-sidebar").html(html);
  updateTexts();
}
