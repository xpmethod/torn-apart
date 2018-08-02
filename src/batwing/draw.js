import _ from "lodash";
// import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { lineRadial } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { timeParse } from "d3-time-format";
import { purple, green, orange } from "../constants";

export default function(wingData, width){

  const y = scaleLinear()
    .domain([0, 1025])
    .range([0, width / 2]);

  _.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], angle => {
    wingData.g.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", -y(300))
      .attr("transform", `rotate(${angle * 360/12})`)
      .attr("stroke", "black");
  });


  wingData.g.append("text")
    .attr("transform", `rotate(${90})`)
    .attr("text-anchor", "middle")
    .attr("dy", -y(500))
    .style("fill", green)
    .style("font-size", "1.5rem")
    .style("font-weight", "bold")
    .text(wingData.title);

  const colors = [purple, green, orange];
  const lines = ["zymotic", "wounds", "other"].map( data => {
    return lineRadial()
      .angle(d => wingData.x(timeParse("%B %Y %d")(`${d.month} ${d.year} 1`)))
      .radius(d => y(d["dpml_" + data]));
  });
  _.each(lines, (line, i) => {
    wingData.g.append("path")
      .datum(wingData.data)
      .attr("fill", colors[i])
      .attr("opacity", 0.5)
      .attr("d", line);
  });

  _.each(["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"], (month, i) => {
    wingData.g.append("text")
      .attr("dy", -y(350))
      // .attr("text-size", 10)
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(${i * 360/12})`)
      .text(month);
  });

  const yAxis = axisLeft(y);
  wingData.g.append("g")
    .classed("y-axis", true)
    .attr("transform", `rotate(${90})`)
    .call(yAxis);

}
