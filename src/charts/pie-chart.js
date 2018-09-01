import $ from "jquery";
import { pie, arc } from "d3-shape";
import animatePieChart from "./animate-pie-chart";

export default function(chart) {
  // Set the radius for the pie charts.
  const radius = Math.min(chart.width, chart.height) / 2;
  // g is set in ./charts/init. It is a <g> SVG group.
  chart.g
    .attr("id", `${chart.number}-g`)
    .attr(
      "transform",
      `translate(${$(chart.id).width() / 2},${chart.height / 2})`
    );
  // Create d3's pie thing.
  const thePie = pie()
    .sort(null)
    // this is opaque. Basically I'm telling the pie chart to get the numerical
    // value from the d["facilityCount"] value in each object in the data array
    // for one pie chart and d["adpCount"] in the other. I set both of those as
    // "number" when the two objects were defined.
    .value(d => +d[chart.number]);
  const path = arc()
    .outerRadius(radius - 10)
    // Having an inner radius > 0 makes a donut.
    .innerRadius(0);
  // thePie creates the arcs, but now we have to work with each arc, or slice.
  const theArc = chart.g
    .selectAll(".arc")
    // bind each arc to one member of the data array.
    .data(thePie(chart.data))
    // and make a <g class="arc">
    .enter()
    .append("g")
    .classed("arc", true);
  // Now to the arcs, add a path
  theArc
    .append("path")
    // "d" is the svg mini-language that defines what the path (outline) of the
    // arc is
    .attr("d", path)
    // give it a unique class name.
    .attr("class", d => `${d.data.group}-slice`)
    .attr("data-group", d => d.data.group)
    // fill it based on the color property in the data object
    .attr("fill", d => d.data.color)
    // no outline
    .style("stroke-width", 0)
    // but if there were an outline, it'd be black.
    .style("stroke", "black")
    // And make it a bit see through.
    .style("opacity", 0.7)
    // and animate the show when you click on one of the slices.
    .on("click", animatePieChart);
}
