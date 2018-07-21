import $ from "jquery";
import { select, selectAll } from "d3-selection";
import { format } from "d3-format";
import { sliderHorizontal } from "d3-simple-slider";
import { rem } from "../constants";
import linesChangeHeights from "./change-heights";
export default function(){
  const width = $("#legend").width() - 2 * rem;
  const slider = sliderHorizontal();
  slider.min(2012)
    .max(2017)
    .tickFormat(format(".0f"))
    .ticks(5)
    .step(1)
    .width(width - 2 * rem)
    .default(2017)
    .on("onchange", linesChangeHeights);
  select("#lines-slider").append("svg")
    .attr("width", width)
    .attr("height", 2.5 * rem)
    .append("g")
    .attr("transform", `translate(${rem},7)`)
    .call(slider);
  selectAll(".tick").selectAll("text")
    .attr("dy", `${0.25 * rem}px`);
  select(".parameter-value").select("text")
    .attr("dy", `${0.25 * rem}px`);
}
