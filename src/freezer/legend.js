import $ from "jquery";
import { moveLegend } from "../utils";
import updateTexts from "../update-texts";

export default function(){
  $("#legend").show().html(`<div class="px-3 py-2">
    <div class="d-flex justify-content-between">
      <div class="legend-svg-div">
var ordinal = d3.scaleOrdinal()
  .domain(["Product Categories", "Products", "Contractors", "Parent Companies"])
  .range([ color = "green", color = "purple", color = "orange", color = "pink"]);

var svg = d3.select("svg");

svg.append("g")
  .attr("class", "legendOrdinal")
  .attr("transform", "translate(20,20)");

var legendOrdinal = d3.legendColor()
  .shape("rect")
  .shapePadding(10)
  .scale(ordinal);

svg.select(".legendOrdinal")
  .call(legendOrdinal);
        </div>
    </div>
    <span data-i18n="ta-v2-explorer-legend" class="markdownify"></span>
  </div>`);
  updateTexts();
  moveLegend();
  const divWidth = Math.floor($(".legend-svg-div").width());
  $(".legend-svg").attr("width", divWidth);
  $(".legend-rect").attr("width", divWidth);
}
