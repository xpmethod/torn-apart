import $ from "jquery";
import { select } from "d3-selection";
import { purple } from "./constants";

export default {
  start() {
    const center = [$(window).width() / 2 - 50, $(window).height() / 2 - 50];
    select("body")
      .append("div")
      .attr("id", "spinner")
      .style("position", "absolute")
      .style("left", center[0] + "px")
      .style("top", center[1] + "px")
      .style("z-index", 1100)
      .append("i")
      .attr("class", "fas fa-pulse fa-spinner")
      .style("color", purple)
      .style("font-size", "100px");
  },
  stop() {
    select("#spinner").remove();
  }
};
