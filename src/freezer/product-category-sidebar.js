//import _ from "lodash";
//import PostIt from "./post-it";
import { select } from "d3-selection";

export default function(d){

  const svg = select("#murderSidebar");
  const postIt = postIt();

  svg.selectAll()
    .data(d)
    .enter()
    .append("");

  return `<p><h4><b>Product Category:</b>
    <br><br>${d.name}`;
  //const html = ["<table class='table table-hover table-sm'>"];
  //html.push("<thead><tr class='thead-dark'>");
  //_.each(["ta-v2-product-category"],
  //  header => html.push(`<th><small data-i18n="${header}"></small></th>`));
  //html.push("</td></thead><tbody>");
  //_.each(d, d => {
  //  html.push("<tr>");
  //  html.push(`<td><small>${d.name}`);
  //  html.push("</tr><tr>");
  //});
  //html.push("</tbody></table>");
  //  return html.join("\n");
}
