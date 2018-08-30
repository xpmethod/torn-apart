import { selectAll, select } from "d3-selection";
import { green, purple } from "../constants";
import rainSizeLegend from "./size-legend";
import rainLegendExtraLabels from "./legend-extra-labels";

export default function(svg, r, circleSizes) {
  const legendG = svg
    .append("g")
    .attr("id", "rain-legend")
    .classed("legend", true);

  const sizeLegendContent = rainSizeLegend(r);

  legendG
    .append("g")
    .attr("id", "rain-size-legend")
    .call(sizeLegendContent)
    .selectAll("circle")
    .attr("fill", purple);

  const legendXShift = window.matchMedia("(max-width: 576px)").matches ? 0 : 30;

  legendG
    .attr(
      "transform",
      `translate(${legendXShift}, ${svg.attr("height") -
        $("#rain-legend")[0].getBBox().height})`
    )
    .selectAll(".legendTitle")
    .attr("transform", "translate(0, -10)")
    .attr("data-i18n", "ta-contract-value-and-type")
    .classed("subsubhead", true);

  select("#rain-size-legend .legendCells")
    .selectAll(".cell")
    .append("circle")
    .each(function(d, i) {
      svg
        .append("clipPath")
        .attr("id", `rain-size-legend-clip-path-${i}`)
        .append("rect")
        .attr("transform", `translate(${circleSizes[i] * -1},0)`)
        .attr("width", 2 * circleSizes[i])
        .attr("height", circleSizes[i]);
    })
    .attr("clip-path", (d, i) => `url(#rain-size-legend-clip-path-${i}`)
    .attr("fill", green)
    .attr("r", (d, i) => circleSizes[i]);

  rainLegendExtraLabels(circleSizes);
}
