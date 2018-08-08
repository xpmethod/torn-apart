import { legendSize, legendHelpers } from "d3-svg-legend";

export default function(scale){
  return legendSize()
    .scale(scale)
    .shape("circle")
    .shapePadding(50)
    .labels(legendHelpers.thresholdLabels)
    .labelOffset(20)
    .labelWrap(50)
    // .locale("en-US")
    .labelFormat("$.2s")
    .orient("horizontal");
}
