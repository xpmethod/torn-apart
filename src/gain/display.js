import $ from "jquery";
import { select } from "d3-selection";
import gainBars from "./bars";
import { fillV2DivHeight } from "../utils";

export default function() {
  const height = fillV2DivHeight("#gain-headers");
  const width = $("#gain-svg-div").width();

  if (window.matchMedia("(min-width: 576px)").matches) {
    $("#gain-profiteers").height(height);
  }

  select("#taller-browser").remove();

  if (height > 210) {
    gainBars(width, height);
  } else {
    select("#gain-bars-svg").remove();
    select("#gain-svg-div")
      .append("h2")
      .attr("id", "taller-browser")
      .classed("text-center", true)
      .attr("data-i18n", "ta-please-make-your-browser-window-taller-and-reload")
      .html($.i18n("ta-please-make-your-browser-window-taller-and-reload"));
  }
}
