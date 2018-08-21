import $ from "jquery";
import { event, select } from "d3-selection";

export function handleMouseOver(d, coords){
  let pageX, pageY;
  if(coords){
    pageX = coords[0];
    pageY = coords[1];
  } else {
    pageX = event.pageX;
    pageY = event.pageY;
  }
  d.mouseOver();
  select("#tooltip")
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
    })
  // .transition().delay(0).duration(0)
    .style("opacity", 1);
}

export function handleMouseOut(d){
  d.mouseOut();
  select("#tooltip").style("opacity", 0);
}
