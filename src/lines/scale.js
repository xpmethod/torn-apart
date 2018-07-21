import _ from "lodash";
import linesConstants from "./constants";

export default function(bar, y){
  const superscript = "⁰¹²³⁴⁵⁶⁷⁸⁹".split("");
  _.each([10, 100, 1000, 10000], value => {
    bar.append("text")
      .style("fill", "white")
      .attr("data-value", value)
      .attr("dy", -(y(value) - 4))
      .attr("dx", 5)
      .attr("opacity", d => {
        if(d.currValue / value > 1 && d.currValue / value < 10){
          return linesConstants.opacity;
        } else {
          return 0;
        }
      })
      .text(`10${superscript[Math.log10(value)]}`);
    bar.append("line")
      .attr("data-value", value)
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 4)
      .attr("y2", 0)
      .attr("opacity", d => {
        if(d.currValue / value > 1 && d.currValue / value < 10){
          return linesConstants.opacity;
        } else {
          return 0;
        }
      })
      .attr("transform", `translate(0,-${y(value)})`);
  });
}
