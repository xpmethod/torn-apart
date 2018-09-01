import { select } from "d3-selection";

// This function adds some properties to the dataObjects that are later used
// when building the visualizations.

export default function(chart, svgWidth, svgHeight) {
  let svgW;
  if (chart.svgWidth) {
    svgW = chart.svgWidth;
  } else {
    svgW = svgWidth;
  }

  let svgH;
  if (chart.svgHeight) {
    svgH = chart.svgHeight;
  } else {
    svgH = svgHeight;
  }

  chart.height = svgH - chart.margins.top - chart.margins.bottom;
  chart.width = svgW - chart.margins.left - chart.margins.right;
  chart.svg = select(chart.id).attr("height", svgH);
  chart.g = chart.svg
    .append("g")
    .attr("transform", `translate(${chart.margins.left},${chart.margins.top})`);
}
