import { select } from "d3-selection";
import { scaleLog } from "d3-scale";
import "d3-transition";

export default function(value){
  const y = scaleLog().rangeRound([50, 0]);
  y.domain([1, 57296]); // the largest value.
  select("#lines-g").selectAll("g").selectAll("rect")
    .transition().delay(0).duration(250)
    .attr("height", d => y(d[`y${value}`] +  0.1));
}
