import { select } from "d3-selection";

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
