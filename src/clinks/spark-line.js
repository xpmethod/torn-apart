import { min, max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { format } from "d3-format";
import { green } from "../constants";

export default function(data) {
  const theMax = max(data.map(d => d[1]));
  const svg = select("#hidden-svg")
      .append("svg")
      .attr("width", 150)
      .attr("height", 128),
    width = +svg.attr("width") - 50,
    height = +svg.attr("height") - 30,
    g = svg.append("g").attr("transform", "translate(35,10)");
  const x = scaleLinear().rangeRound([0, width]);
  const y = scaleLinear().rangeRound([height, 0]);
  const theLine = line()
    .x(function(d) {
      return x(d[0]);
    })
    .y(function(d) {
      return y(d[1]);
    });
  x.domain([2014, 2018]);
  y.domain([0, theMax]);

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", green)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", theLine);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      axisBottom(x)
        .tickValues([2014, 2018])
        .tickFormat(format(".0f"))
    );

  g.append("g")
    .call(
      axisLeft(y)
        .ticks(min([theMax, 5]))
        .tickFormat(format(".0f"))
    )
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Avg. Daily Pop.");

  return svg.node().innerHTML;
}
