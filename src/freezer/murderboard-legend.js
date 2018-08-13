import { legendColor } from "d3-svg-legend";

export default function(scale){
  return legendColor()
    .title("Contract Type")
    .labels(["Product Category", "Product", "Subsidiary Contractor", "Contractor"])
    .shape("rect")
    .shapeWidth(50)
    .shapePadding(10)
    .scale(scale);
}
