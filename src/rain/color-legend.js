import { legendColor } from "d3-svg-legend";

export default function(scale) {
  return legendColor()
    .title("Contract Type")
    .labels(["Multiple Awards to Single Contractor", "One-off Awards"])
    .shape("rect")
    .shapeWidth(50)
    .shapePadding(10)
    .scale(scale);
}
