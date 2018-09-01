import _ from "lodash";
import roseRadius from "./radius";
import { scaleLinear } from "d3-scale";
// import { timeFormat, timeParse } from "d3-time-format";
import { arc } from "d3-shape";
import { purple, green, orange } from "../../constants";

export default function(roseData) {
  const width = roseData.svg.attr("width");
  const height = roseData.svg.attr("height");
  const g = roseData.svg
    .append("g")
    .attr(
      "transform",
      `translate(${width / 2},${0.33 * height})rotate(${-90})`
    );
  const y = scaleLinear()
    .domain([0, roseRadius(1025)])
    .range([0, width / 1.6]);
  const colors = [purple, green, orange];
  _.each(roseData.data, (datum, i) => {
    const data = _.sortBy(
      ["zymotic", "wounds", "other"].map((column, i) => {
        return {
          value: datum["dpml_" + column],
          color: colors[i]
        };
      }),
      ["value"]
    ).reverse();
    const petalG = g
      .append("g")
      .classed("axis", true)
      .attr("transform", `rotate(${(i * 360) / 12})`)
      .attr("id", `petal-${datum.yr_month}-g`);
    petalG
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", d => d.color)
      .attr("d", d => {
        return arc()
          .innerRadius(0)
          .outerRadius(y(roseRadius(d.value)))
          .startAngle(0)
          .endAngle(Math.PI / 6)();
      });
    petalG
      .append("path")
      .attr("id", `text-path-${datum.yr_month}`)
      .style("fill", "none")
      .style("stroke-width", 0)
      .attr("d", () => {
        const pretendArc = arc()
          .innerRadius(0)
          .outerRadius(
            () =>
              data[0].value < 150
                ? y(roseRadius(140))
                : 10 + y(roseRadius(data[0].value))
          )
          .startAngle(0)
          .endAngle(Math.PI / 6)();
        // trim out and keep the arc part of the wedge.
        return pretendArc.match(/([^L]*)L/)[1];
      });
    petalG
      .append("text")
      .append("textPath")
      .attr("startOffset", "50%")
      .style("text-anchor", "middle")
      .attr("xlink:href", `#text-path-${datum.yr_month}`)
      .text(datum.month.slice(0, 3));
    // .text(datum.month);
  });
}
