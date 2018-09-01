import L from "leaflet";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import linesConstants from "./constants";
import linesLogScale from "./log-scale";

export default function() {
  // nb, y becomes x.
  const x = linesLogScale();
  const svg = select("#lines-scale-svg");
  const path = svg
    .append("path")
    .attr("id", "lines-scale-wedge")
    .attr("fill", "black")
    .attr("transform", `translate(5, ${linesConstants.barWidth})`)
    .attr(
      "d",
      `M0 0 H ${linesConstants.rangeMax} V -${linesConstants.barWidth} Z`
    );
  const axis = svg
    .append("g")
    .attr("id", "lines-scale-axis")
    .attr("transform", `translate(5, ${linesConstants.barWidth + 5})`)
    .call(axisBottom(x).tickArguments([5, ".0s"]));
  axis
    .select(".tick")
    .select("text")
    .text("0");
  const removals = svg
    .append("text")
    .attr("transform", "translate(5, 10)")
    .attr("data-i18n", "ta-removals")
    .text("Removals");
  if (L.Browser.mobile) {
    axis.attr(
      "transform",
      `translate(${(svg.attr("width") - linesConstants.rangeMax) / 2}, ${
        linesConstants.barWidth
      })`
    );
    path.attr(
      "transform",
      `translate(${(svg.attr("width") - linesConstants.rangeMax) / 2}, ${
        linesConstants.barWidth
      })`
    );
    removals
      .style("text-anchor", "end")
      .attr(
        "transform",
        `translate(${(svg.attr("width") - linesConstants.rangeMax) / 2 -
          10}, 10)`
      );
  }
}
