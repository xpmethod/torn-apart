import { select } from "d3-selection";
import { scaleLog } from "d3-scale";
import "d3-transition";
import linesConstants from "./constants";

export default function(value){
  const y = scaleLog().rangeRound([0, linesConstants.rangeMax]);
  y.domain([0.1, linesConstants.yMax]); // the largest value.
  select("#lines-g").selectAll("g").selectAll("rect")
    .each(function(d){ 
      // Set all these before the transition begins.
      // But the transition is still interfering, so kill it.
      d.oldHeight = select(this).attr("height");
      d.newHeight = y(d[`y${value}`] + 0.1);
    })
    .attr("transform", function(d) {
      return `translate(-${linesConstants.barWidth/2},-${d.newHeight})`;
    })
    .attr("height", d => d.newHeight);
  select("#lines-g").selectAll("g").selectAll("path")
    .attr("d", d  => {
      return `M0 0 V -${d.newHeight} H ${linesConstants.barWidth} Z`;
    });
}
