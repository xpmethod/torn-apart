import _ from "lodash";
import { select } from "d3-selection";
import { scaleLog } from "d3-scale";
import "d3-transition";
import linesConstants from "./constants";

export default function(value){
  const y = scaleLog().rangeRound([0, linesConstants.rangeMax]);
  y.domain([0.1, linesConstants.yMax]); // the largest value.
  select("#lines-g").selectAll("g").selectAll("path")
    .attr("d", d  => {
      d.currYear = value;
      d.currValue = d[`y${value}`] + 0.1;
      d.newHeight = y(d.currValue);
      if(d.currValue < 2 && d.currValue > 0.2){ 
        d.tooltip = linesConstants.tooltipSingular(d);
      } else { 
        d.tooltip = linesConstants.tooltipPlural(d);
      }
      const scaleFactor = d.newHeight / linesConstants.rangeMax;
      return `M0 0 V -${d.newHeight} H ${scaleFactor * linesConstants.barWidth} Z`;
    })
    .attr("opacity", d => d.currValue);
  _.each(["line", "text"], tag => {
    select("#lines-g").selectAll("g").selectAll(tag)
      .attr("opacity", function(d){
        const value = _.parseInt(select(this).attr("data-value"));
        if(d.currValue / value > 1 && d.currValue / value < 10){
          return linesConstants.opacity;
        } else {
          return 0;
        }
      });
  });
}
