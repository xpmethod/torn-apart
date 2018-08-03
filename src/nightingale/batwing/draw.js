import _ from "lodash";
import { axisLeft } from "d3-axis";
import { lineRadial } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { timeFormat, timeParse } from "d3-time-format";
import { purple, green, orange } from "../../constants";

export default function(wingData, height){

  const y = scaleLinear()
    .domain([0, 1025])
    .range([0, height / 1.7]);

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

  const xAxis = wingData.g.append("g")
    .classed("a", true)
    .classed("axis", true)
    .selectAll("g")
    .data(wingData.x.ticks())
    .enter().append("g")
    .attr("transform", (d, i) => `rotate(${-90 + i * 360/12})`);

  xAxis.append("line")
    .attr("x2", y(300));

  xAxis.append("text")
    .attr("x", y(300) + 6)
    .attr("dy", ".35em")
    .style("text-anchor", (d, i) => i < 3 || i > 9 ? "end" : null)
    .attr("transform", (d, i) => i < 3 || i > 9 ? `rotate(180 ${y(300) + 6},0)` : null)
    .text((d, i) => {
      let text = timeFormat("%b %Y")(d);
      if(text.match("Jan") || i === 12){
        text = "";
      }
      return text;
    });
    
  const yAxis = axisLeft(y);
  wingData.g.append("g")
    .classed("y-axis", true)
    .attr("transform", `rotate(${90})`)
    .call(yAxis);

  _.each([1, 2, 3], tick => {
    wingData.g.append("circle")
      .classed("tick", true)
      .attr("r", y(tick * 100));
  });
}
