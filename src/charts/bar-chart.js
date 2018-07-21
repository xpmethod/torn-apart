import $ from "jquery";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { format } from "d3-format";

export default function(chart, svgHeight, svgWidth){
  // chart is a data object coming in with certain properties already set,
  // namely data, id, svg, g, height, margins, showFY, and i18n.
  // svgHeight and svgWidth are constants coming in.
  //
  // First, we create the two scales. scaleBand is for making bar charts.
  // scaleLinear creates a linear scale. The following arrays describe, 
  // in pixes, the bounds.
  chart.x = scaleBand().rangeRound([0, chart.width]).padding(0.1);
  chart.y = scaleLinear().rangeRound([chart.height, 0]);
  // Next we define the domains. The y variable obviously goes from 0 to the
  // predefined ymax. d[0], however, refers to something like "FY18". These are
  // the category labels.
  chart.x.domain(chart.data.map(d => d[0]));
  chart.y.domain([0, chart.ymax]);
  // This fills in the "#total-places-no" div with a big number.
  $(chart.id.replace("svg", "no")).html(format(",.0f")(chart.data[chart.data.length - 1][1]));
  // Now draw the bar chart.
  // g is a <g> (group) svg object sitting inside chart.svg. It is created in
  // ./charts/init.js
  chart.g.selectAll(".bar")
    // bind the array in chart.data to each rect it's about to draw
    // data looks like:
    // [
    //   ["category1", number],
    //   ["category2", number],
    //   ["category3", number]
    // ]
    .data(chart.data).enter().append("rect").attr("class", "bar")
    // determine the height based on the oneth array value (number above) and
    // the category name based on the zeroth value in data. Position the
    // initial corner (top left) in relation to those things.
    .attr("y", d => chart.y(d[1])).attr("x", d => chart.x(d[0]))
    .attr("height", d => chart.height - chart.y(d[1]))
    .attr("width", chart.x.bandwidth());
  // Now add the axes.
  chart.g.append("g").attr("transform", `translate(0,${chart.height})`)
    .call(axisBottom(chart.x));
  chart.g.append("g").call(axisLeft(chart.y).ticks(5).tickFormat(format(".2s"))).append("text")
    .attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em")
    // Add some text.
    .attr("text-anchor", "end").attr("data-i18n", chart.i18n);
  // Do we show Fiscal years? If so…
  if(chart.showFY){
    chart.svg.append("text").attr("transform", `translate(${svgWidth - chart.margins.right},${svgHeight - 4})`)
      // Add some text.
      .attr("text-anchor", "end").attr("data-i18n", "ta-v1-fiscal-year-begins");
  }
}
