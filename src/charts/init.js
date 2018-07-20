import { select } from "d3-selection";

// This function adds some properties to the dataObjects that are later used
// when building the visualizations.

export default function(chart, svgWidth, svgHeight){
  let svgW;
  if(chart.svgWidth){
    svgW = chart.svgWidth;
  } else {
    svgW = svgWidth;
  }
  chart.height = svgHeight - chart.margins.top - chart.margins.bottom;
  chart.width = svgW - chart.margins.left - chart.margins.right;
  chart.svg = select(chart.id).attr("height", svgHeight);
  chart.g = chart.svg.append("g").attr("transform", `translate(${chart.margins.left},${chart.margins.top})`);
}
