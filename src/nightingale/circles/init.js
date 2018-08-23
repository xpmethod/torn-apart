import $ from "jquery";
import { select } from "d3-selection";

export default function() {
  const width = $("#circles-div").width();
  const height = 0.66 * width;
  const rectHeight = 0.1 * height;

  const svg = select("#circles-svg")
    .attr("height", height)
    .attr("width", width);
  const g = svg.append("g").attr("transform", `translate(${0.05 * width},0)`);

  g.append("rect")
    .classed("purple", true)
    .attr("height", rectHeight)
    .attr("width", 0.25 * width);

  g.append("rect")
    .classed("purple", true)
    .attr("transform", `translate(0,${0.15 * height})`)
    .attr("height", rectHeight)
    .attr("width", 0.5 * width);

  g.append("rect")
    .classed("purple", true)
    .attr("transform", `translate(0,${0.3 * height})`)
    .attr("height", rectHeight)
    .attr("width", 0.75 * width);

  const gg = svg
    .append("g")
    .attr("transform", `translate(${-0.031 * width},${0.5 * height})`);

  gg.append("circle")
    .classed("purple", true)
    .attr("transform", `translate(${0.25 * width},${0.25 * height})`)
    .attr("r", rectHeight);

  gg.append("circle")
    .classed("purple", true)
    .attr("transform", `translate(${0.469 * width},${0.25 * height})`)
    .attr("r", Math.sqrt(2) * rectHeight);

  gg.append("circle")
    .classed("purple", true)
    .attr("transform", `translate(${0.75 * width},${0.25 * height})`)
    .attr("r", rectHeight * 2);
}
