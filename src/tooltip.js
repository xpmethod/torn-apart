import $ from "jquery";
import { event, selectAll, select } from "d3-selection";

export function handleMouseOver(d){
  let pageX, pageY;
  if(d.coords){
    pageX = d.coords[0];
    pageY = d.coords[1];
  } else {
    pageX = event.pageX;
    pageY = event.pageY;
  }
  d.mouseOver();
  selectAll(".tooltip").remove();
  select("body")
    .append("div")
    .classed("tooltip", true)
    .attr("id", "tooltip")
    .style("opacity", 0.9)
    .html(d.tooltip)
    .style("left", function(){
      const toolTipWidth = $("#tooltip").width();
      if(toolTipWidth > pageX){
        return pageX + "px";
      } else {
        return (pageX - toolTipWidth) + "px";
      }
    })
    .style("top", function(){
      const toolTipHeight = $("#tooltip").height();
      if(($(window).height() - pageY) < toolTipHeight){
        return (pageY - toolTipHeight) + "px";
      } else {
        return pageY + "px";
      }
    });
  // .transition().delay(0).duration(0)
}

export function handleMouseOut(d){
  d.mouseOut();
  selectAll(".tooltip").remove();
}
