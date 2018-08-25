import $ from "jquery";
import L from "leaflet";
import { event, selectAll, select } from "d3-selection";
import { rem } from "./constants";

export function handleMouseOver(d) {
  let pageX, pageY;
  let minWidth = 10 * rem;
  let maxWidth = 20 * rem;
  if (L.Browser.mobile) {
    pageX = 1 * rem;
    pageY = 4.5 * rem;
    minWidth = $(window).width() - 2 * rem;
    maxWidth = $(window).width() - 2 * rem;
  } else if (d.coords) {
    pageX = d.coords[0];
    pageY = d.coords[1];
  } else {
    pageX = event.pageX;
    pageY = event.pageY;
  }
  if (pageY < 0) {
    pageX = 30;
    pageY = 100;
  }
  d.mouseOver();
  selectAll(".tooltip").remove();
  select("body")
    .append("div")
    .classed("tooltip", true)
    .attr("id", "tooltip")
    .style("opacity", 0.9)
    .style("max-width", maxWidth + "px")
    .style("min-width", minWidth + "px")
    .style("left", function() {
      const toolTipWidth = $("#tooltip").width();
      if (toolTipWidth > pageX) {
        return pageX + "px";
      } else {
        return pageX - toolTipWidth + "px";
      }
    })
    .style("top", function() {
      if (L.Browser.mobile) {
        return pageY + "px";
      } else {
        const toolTipHeight = $("#tooltip").height();
        // this is just going to be 3rem or 32px…
        if ($(window).height() - pageY < 12 * toolTipHeight) {
          return pageY - 6 * toolTipHeight + "px";
        } else {
          return pageY - toolTipHeight + "px";
        }
      }
    })
    .html(d.tooltip);
  // .transition().delay(0).duration(0)
}

export function handleMouseOut(d) {
  d.mouseOut();
  selectAll(".tooltip").remove();
}
