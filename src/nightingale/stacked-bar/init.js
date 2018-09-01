import $ from "jquery";
import { axisBottom, axisLeft } from "d3-axis";
import { stack, stackOrderAscending } from "d3-shape";
import { select } from "d3-selection";
import { timeFormat, timeParse } from "d3-time-format";
// import { timeParse } from "d3-time-format";
import { purple, green, orange } from "../../constants";
import { scaleOrdinal, scaleBand, scaleLinear } from "d3-scale";
import Data from "../army_of_east.csv";

export default function() {
  const width = $("#stackedbar-div").width();
  const height = 0.66 * width;
  const svg = select("#stackedbar-div")
    .append("svg")
    .attr("height", height)
    .attr("width", width);
  const margins = [5, 25, 30, 35];
  const keys = ["dpml_zymotic", "dpml_wounds", "dpml_other"];
  const x = scaleBand()
    .rangeRound([0, width - margins[1] - margins[3]])
    .paddingInner(0.05)
    .align(0.1)
    // .domain([new Date(1854, 3), new Date(1856, 3)]);
    .domain(Data.map(d => d.yr_month));
  const y = scaleLinear()
    .domain([0, 1200])
    // .domain([0, 2750])
    .rangeRound([height - margins[0] - margins[2], 0]);
  const z = scaleOrdinal()
    .domain(keys)
    .range([purple, green, orange]);

  const g = svg.append("g");
  g.append("g")
    .attr("transform", `translate(${margins[3]},${margins[0]})`)
    .selectAll("g")
    .data(
      stack()
        .order(stackOrderAscending)
        .keys(keys)(Data)
    )
    .enter()
    .append("g")
    .attr("fill", d => z(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("x", d => x(d.data.yr_month))
    // .attr("x", d => x(timeParse("%B %Y %d")(`${d.data.month} ${d.data.year} 1`)))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", width / 24 - 5);

  const xAxis = g
    .append("g")
    .classed("axis", true)
    .attr("transform", `translate(${margins[3]},${height - margins[2]})`);
  if (window.matchMedia("(max-width: 576px)").matches) {
    xAxis.call(
      axisBottom(x)
        .tickValues([
          "1854-4",
          "1854-8",
          "1855-1",
          "1855-4",
          "1855-8",
          "1856-1"
        ])
        .tickFormat(d => {
          return timeFormat("%b")(timeParse("%Y-%m")(d));
        })
    );
  } else {
    xAxis.call(
      axisBottom(x).tickFormat(d => {
        return timeFormat("%b")(timeParse("%Y-%m")(d));
      })
    );
  }

  g.append("g")
    .classed("axis", true)
    .attr("transform", `translate(${margins[3]},${height - margins[2] + 30})`)
    .selectAll("text")
    .data(["1854-4", "1855-1", "1856-1"])
    .enter()
    .append("text")
    .attr("x", d => x(d))
    .text(d => d.replace(/-.*/, ""));

  g.append("g")
    .classed("axis", true)
    .attr("transform", `translate(${margins[3]},${margins[0]})`) //${height - margins[2]})`)
    .call(axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .text("Mortality rate per mille per annum");
}
