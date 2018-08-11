import { select } from "d3-selection";
import {green, orange, purple, pink} from "../constants";
import { format } from "d3-format";
import { slug } from "../utils";

 
//Draw the words of the word cloud  

export default function(words) {

  var colour = [green, orange, purple, pink];
   
  select("#wordcloud-g").selectAll("text")
    .data(words)
    .enter().append("text")
    .attr("text-anchor", "middle")
    .style("font-family", "Impact")
    .style("font-size", function(d) { return (Math.ceil(Math.pow(d.total_value, 0.26))/4 +4) + "px"; })
    .style("fill", function(d) {return colour[d.years-1];})
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) {
      return d.name;
    })
    .each(d => {
      d.id = `${slug(d.name)}`;
      
      if (d.name === "CCA") {
        d.tooltip = `${d.name} (CoreCivic, formerly known as Corrections Corporation of America):
        <strong>${format("$,.0f")(Math.ceil(d.total_value))}</strong> for <strong>${d.product}</strong> over <strong>${d.years}</strong> ${d.years > 1 ? "years" : "year"}`;
      } else {
        d.tooltip = `${d.name}:
        <strong>${format("$,.0f")(Math.ceil(d.total_value))}</strong> for <strong>${d.product}</strong> over <strong>${d.years}</strong> ${d.years > 1 ? "years" : "year"}`;
      }
      d.mouseOver = () => {
        select(`#text-${d.id}`).style("opacity",0.7);
      };
      d.mouseOut = () => {
        select(`#text-${d.id}`).style("opacity",1);
      };
    })
    .attr("id", d => `text-${d.id}`);
}
