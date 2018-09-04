import _ from "lodash";
import { scaleBand, scaleLinear } from "d3-scale";
import { stack } from "d3-shape";
import { axisBottom } from "d3-axis";

export default function({
  g,
  z,
  value,
  countData,
  valueData,
  height,
  margins,
  width,
  valueX,
  countX,
  data
}) {
  // const babyValue = g.append("g");
  const babyHeight = 0.7 * (height / 2 - margins.bottom);
  const babyTicks = window.matchMedia("(max-width: 576px)").matches ? 2 : 5;

  const babyY = scaleBand()
    .rangeRound([0, babyHeight])
    .domain(["minority", "women"])
    .paddingInner(0.05)
    .align(0.1);

  const babyCountX = scaleLinear()
    .range([
      0,
      width - margins.left - margins.right - countX(0.3 * data.totalParents)
    ])
    .domain([0, data.totalParents]);

  const babyValueX = scaleLinear()
    .range([
      0,
      width - margins.left - margins.right - valueX(0.3 * data.totalValue)
    ])
    .domain([0, data.totalValue]);

  const babyCount = g
    .append("g")
    .attr("id", "baby-count")
    .attr("transform", `translate(${countX(0.3 * data.totalParents)}, 0)`);

  const babyValue = value
    .append("g")
    .attr("id", "baby-value")
    .attr("transform", `translate(${valueX(0.3 * data.totalValue)}, 0)`);

  babyCount
    .selectAll("g")
    .data(stack().keys(data.minorityCategories)(countData))
    .enter()
    .append("g")
    .attr("fill", d => z(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("y", d => babyY(d.data.type))
    .attr("x", d => babyCountX(d[0]))
    .attr("height", babyY.bandwidth())
    .attr("width", d => {
      if (_.isNaN(babyCountX(d[1]) - babyCountX(d[0]))) {
        return 0;
      } else {
        return babyCountX(d[1]) - babyCountX(d[0]);
      }
    });

  babyCount
    .append("path")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("d", `M ${babyCountX(data.totalParents)},0 V ${babyHeight}`);

  babyCount
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${babyHeight})`)
    .call(axisBottom(babyCountX).ticks(babyTicks));

  babyCount
    .append("text")
    .attr(
      "transform",
      `translate(${babyCountX(data.totalParents) - 10}, 0)rotate(-90)`
    )
    .style("text-anchor", "end")
    .text(`$a-total")}: ${data.totalParents}`);

  babyValue
    .selectAll("g")
    .data(stack().keys(data.minorityCategories)(valueData))
    .enter()
    .append("g")
    .attr("fill", d => z(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("y", d => babyY(d.data.type))
    .attr("x", d => babyValueX(d[0]))
    .attr("height", babyY.bandwidth())
    .attr("width", d => {
      if (_.isNaN(babyValueX(d[1]) - babyValueX(d[0]))) {
        return 0;
      } else {
        return babyValueX(d[1]) - babyValueX(d[0]);
      }
    });

  babyValue
    .append("g")
    .attr("class", "axis gain-value-axis")
    .attr("transform", `translate(0,${babyHeight})`)
    .call(axisBottom(babyValueX).ticks(babyTicks, "$s"));

  babyValue
    .append("path")
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("d", `M ${babyValueX(data.totalValue)},0 V ${babyHeight}`);

  babyValue
    .append("text")
    .attr(
      "transform",
      `translate(${babyValueX(data.totalValue) - 10}, 0)rotate(-90)`
    )
    .style("text-anchor", "end")
    // .text(`total: $${bigMoneyFormat(data.totalValue)}`);
    .text(`total: $${data.totalValue}`);
}
