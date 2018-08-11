import { legendSize, legendHelpers } from "d3-svg-legend";

export default function(scale){
  return legendSize()
    .title("Contract Value and Type")
    .scale(scale)
    .shape("circle")
    .shapePadding(50)
    .labels(legendHelpers.thresholdLabels)
    .labelDelimiter("–")
    .labelOffset(20)
    .labelWrap(50)
    // .locale("en-US")
    .labelFormat("$.2s")
    .orient("horizontal");
}
