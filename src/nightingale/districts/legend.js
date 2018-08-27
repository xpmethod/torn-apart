import "d3-transition";
import { select } from "d3-selection";
import { legendColor } from "d3-svg-legend";
import { symbol, symbolSquare } from "d3-shape";
import { purple, green, orange } from "../../constants";
import wrap from "../../wrap";
import { scaleOrdinal } from "d3-scale";

export default function(height, width) {
  const svg = select("#districts-svg");
  const legendG = svg
    .append("g")
    .classed("legendOrdinal", true)
    .attr("transform", `translate(${width / 2},${height / 3})`)
    .attr("id", "districts-legend");
  const scale = scaleOrdinal()
    .domain(["Republican", "Democrat", "No Representative"])
    .range([purple, green, orange]);
  const legend = legendColor()
    .shape(
      "path",
      symbol()
        .type(symbolSquare)
        .size(100)()
    )
    .shapePadding(10)
    .scale(scale);
  legendG.call(legend);

  const head = legendG
    .append("text")
    .classed("subhead", true)
    .attr("dy", "0.01")
    .text("ICE awards since 2014 by Congressional district");
  head.call(wrap, { width: width / 2, lineHeight: 1.1 });
  head.attr("transform", `translate(0,-${head.node().getBBox().height})`);

  const selectedDistrict = legendG
    .append("text")
    .classed("subsubhead", true)
    .attr("dy", "0.01")
    .text("Selected District:");
  selectedDistrict.attr(
    "transform",
    `translate(0, ${legendG.node().getBBox().height / 1.5})`
  );

  const districtText = legendG
    .append("text")
    .attr("id", "district-text")
    .text("No selected district.");
  districtText.attr(
    "transform",
    `translate(0, ${legendG.node().getBBox().height / 1.5})`
  );

  const legendBBox = legendG.node().getBBox();
  legendG
    .append("rect")
    .attr("x", legendBBox.x - 20)
    .attr("y", legendBBox.y - 20)
    .attr("height", legendBBox.height + 40)
    .attr("width", legendBBox.width + 40)
    .style("fill", "none")
    .style("stroke", purple)
    .style("stroke-width", "2px");
}
