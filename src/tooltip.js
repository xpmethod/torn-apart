import $ from "jquery";
import { event, select } from "d3-selection";

export function handleMouseOver(d){
  d.mouseOver();
  select("#tooltip")
    .html(d.tooltip)
    .style("left", function(){
      const toolTipWidth = $("#tooltip").width();
      if(toolTipWidth > event.pageX){
        return event.pageX + "px";
      } else {
        return (event.pageX - toolTipWidth) + "px";
      }
    })
    .style("top", function(){
      const toolTipHeight = $("#tooltip").height();
      if(($(window).height() - event.pageY) < toolTipHeight){
        return (event.pageY - toolTipHeight) + "px";
      } else {
        return event.pageY + "px";
      }
    })
  // .transition().delay(0).duration(0)
    .style("opacity", 1);
}

export function handleMouseOut(d){
  d.mouseOut();
  select("#tooltip").style("opacity", 0);
}