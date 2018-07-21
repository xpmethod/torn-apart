import _ from "lodash";
import { select } from "d3-selection";
import { scaleLog } from "d3-scale";
import "d3-transition";
import linesConstants from "./constants";

export default function(value){
  const y = scaleLog().rangeRound([0, linesConstants.rangeMax]);
  y.domain([1, linesConstants.yMax]); // the largest value.
  select("#lines-g").selectAll("g").selectAll("rect")
    .each(function(d){ 
      // Set all these before the transition begins.
      // But the transition is still interfering, so kill it.
      d.oldHeight = select(this).attr("height");
      d.newHeight = y(d[`y${value}`] + 0.1);
      d.oldXY = select(this).attr("transform")
        .replace("translate(", "").replace(")", "")
        .split(",").map(coord => _.parseInt(coord));
    })
    .attr("transform", function(d) {
      // if(d.name === "San Ysidro"){
      //   console.log(d.newHeight);
      //   console.log(d.oldXY);
      //   console.log(d.oldHeight);
      // }
      return `translate(${d.oldXY[0]},${d.oldXY[1] + (d.oldHeight - d.newHeight)})`;
    })
    .attr("height", d => d.newHeight);
}
