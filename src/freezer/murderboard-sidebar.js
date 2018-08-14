import { select } from "d3-selection";
import productSidebar from "./product-sidebar";
import productCategorySidebar from "./product-category-sidebar";
import companySidebar from "./company-sidebar";
import parentCompanySidebar from "./parent-company-sidebar";
import updateTexts from "../update-texts";
//import { pink, green, purple, orange } from "../constants";
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
  
   
  // trying to make legend work

  //  const legend = murderboardLegend(scale);
  //  var svg = select("#murderboard-legend");

  //  svg.append("g")
  //    .classed("murderboardLegend legend", true)
  //    .call(legend)
  //    .attr("transform", `translate(30, ${svg.attr("height") -
  //        $("g.murderboard-legend")[0].getBBox().height + 20})`)
  //    .attr("fill", purple);

  //  svg.append("rect")
  //    .attr("x", 20)
  //    .attr("y", height - $("g.murderboard-legend")[0].getBBox().height - 20)
  //    .attr("height", 10)
  //    .attr("width", 10)
  //    .attr("fill", orange);

  //  svg.append("text")
  //    .text("Product Category")
  //    .attr("y", height - $("g.murderboard-legend")[0].getBBox().height - 20)
  //    .attr("fill", orange)
  //    .attr("x", 40);

  //  svg.append("rect")
  //    .attr("x", 20)
  //    .attr("y", height - $("g.murderboard-legend")[0].getBBox().height - 20)
  //    .attr("height", 10)
  //    .attr("width", 10)
  //    .attr("fill", purple);

  //  svg.append("text")
  //    .text("Product")
  //    .attr("y", height - $("g.murderboard-legend")[0].getBBox().height - 20)
  //    .attr("fill", purple)
  //    .attr("x", 40);

  //  svg.append("rect")
  //    .attr("x", 20)
  //    .attr("y", height - $("g.murderboard-legend")[0].getBBox().height - 20)
  //    .attr("height", 10)
  //    .attr("width", 10)
  //    .attr("fill", pink);

  //  svg.append("text")
  //    .text("Subsidiary Contractor")
  //    .attr("y", height - $("g.murderboard-legend")[0].getBBox().height - 20)
  //    .attr("fill", pink)
  //    .attr("x", 40);

  //  svg.append("rect")
  //    .attr("x", 20)
  //    .attr("y", height - $("g.murderboard-legend")[0].getBBox().height - 20)
  //    .attr("height", 10)
  //    .attr("width", 10)
  //    .attr("fill", green);

  //  svg.append("text")
  //    .text("Contractor")
  //    .attr("y", height - $("g.murderboard-legend")[0].getBBox().height - 20)
  //    .attr("fill", green)
  //    .attr("x", 40);

  select("#freezer-sidebar").html(html);
  updateTexts();
}
