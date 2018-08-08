import { legendSize } from "d3-svg-legend";

export default function(scale){
  return legendSize()
    .scale(scale)
    .shape("circle")
    .shapePadding(50)
    .labelOffset(20)
    // .locale("en-US")
    .labelFormat("$.2s")
    .orient("horizontal");
}
