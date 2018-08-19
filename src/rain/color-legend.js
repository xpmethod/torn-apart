import { legendColor } from "d3-svg-legend";

export default function(scale){
  return legendColor()
    .title("Contract Type")
    .labels(["Renewed contracts", "Unique contracts"])
    .shape("rect")
    .shapeWidth(50)
    .shapePadding(10)
    .scale(scale);
}
