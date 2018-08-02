import { handleMouseOver, handleMouseOut } from "../tooltip"; //Moacir added this so we can all use the same tooltip code
import slug from "slug";
import { select } from "d3-selection";
import {green, orange, purple, pink} from "../constants";
import { format } from "d3-format";

 
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
      d.tooltip = `<strong>${format("$,.2f")(d.total_value)}`;
      d.mouseOver = () => {
        select(`#text-${d.id}`);
      };
      d.mouseOut = () => {
        select(`#text-${d.id}`);
      };
    })
    .attr("id", d => `text-${d.id}`)
    .on("mouseover", handleMouseOver) //call the mouse-over handler
    .on("mouseout", handleMouseOut); //call the mouse-out handler

}