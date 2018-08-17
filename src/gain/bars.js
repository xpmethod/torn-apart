import _ from "lodash";
import { select } from "d3-selection";
import { stack } from "d3-shape";
import { axisLeft, axisBottom } from "d3-axis";
import { scaleBand, scaleOrdinal, scaleLinear } from "d3-scale";
import { bigMoneyFormat } from "../utils";
import { green, orange, pink, lime, beige, tan, lavender, lightGreen } from "../constants";
import gainBarsLegend from "./bars-legend";
import Data from "../../data/gain/minority-data.json";

export default function(width){
  const margins = { bottom: 20, left: 70 };
  const height = 450;
  const keys = Data.minorityCategories;
  const countData = [{type: "Minority"}, {type:"Woman"}];
  _.each(Data.minorityCategories, cat => {
    countData[0][cat] = Data.minorityCompanies[cat].count;
    countData[1][cat] = Data.intersectionalCompanies[cat].count;
  });
  const valueData = [{type: "Minority"}, {type:"Woman"}];
  _.each(Data.minorityCategories, cat => {
    valueData[0][cat] = Data.minorityCompanies[cat].value;
    valueData[1][cat] = Data.intersectionalCompanies[cat].value;
  });
  keys.push("female");
  countData[1].female = Data.minorityCompanies.female.count;
  valueData[1].female = Data.minorityCompanies.female.value;

  const svg = select("#gain-bars-svg")
    .attr("height", height)
    .attr("width", width);
  const g = svg.append("g")
    .attr("transform", `translate(${margins.left},0)`);


  const y = scaleBand()
    .rangeRound([0, height/2 - margins.bottom])
    .domain(["Minority", "Woman"])
    .paddingInner(0.05)
    .align(0.1);
  const countX = scaleLinear()
    .range([0, width - margins.left])
    .domain([0, Data.totalParents]);
  const valueX = scaleLinear()
    .range([0, width - margins.left])
    .domain([0, Data.totalValue]);
  const z = scaleOrdinal()
    .range([green, orange, pink, lime, beige, tan, lavender, lightGreen])
    .domain(keys);

  g.append("g")
    .selectAll("g")
    .data(stack().keys(Data.minorityCategories)(countData))
    .enter().append("g")
    .attr("fill", d => z(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr("y", d => y(d.data.type))
    .attr("x", d => countX(d[0]))
    .attr("height", y.bandwidth())
    .attr("width", d => countX(d[1]) - countX(d[0]));

  g.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(0,${height/2})`)
    .call(axisLeft(y));

  g.append("g")
    .attr("class", "axis y-axis")
    .call(axisLeft(y));

  g.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height/2 - margins.bottom})`)
    .call(axisBottom(countX));

  g.append("g")
    .attr("transform", `translate(0, ${height/2})`)
    .selectAll("g")
    .data(stack().keys(Data.minorityCategories)(valueData))
    .enter().append("g")
    // .each(d => console.log(d))
    .attr("fill", d => z(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr("y", d => y(d.data.type))
    .attr("x", d => valueX(d[0]))
    .attr("height", y.bandwidth())
    .attr("width", d => valueX(d[1]) - valueX(d[0]));

  g.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height - margins.bottom})`)
    .attr("id", "gain-value-axis")
    .call(axisBottom(valueX).ticks(null, "$s"));

  select("#gain-value-axis")
    .selectAll("text")
    .text(function(){
      return select(this).text().replace(/G/, "B");
    });

  g.append("path")
    .attr("stroke", "black")
    .attr("d", `M ${countX(Data.totalParents)},0 V ${height/2 - margins.bottom}`);

  g.append("text")
    .style("text-anchor", "end")
    .attr("transform", `translate(${countX(Data.totalParents) - 10}, 5)rotate(-90)`)
    .text(`Total companies: ${Data.totalParents}`);

  g.append("path")
    .attr("stroke", "black")
    .attr("d", `M ${valueX(Data.totalValue)},${height/2} V ${height - margins.bottom}`);

  g.append("text")
    .style("text-anchor", "end")
    .attr("transform", `translate(${valueX(Data.totalValue) - 10}, ${height/2 + 5})rotate(-90)`)
    .text(`Total value: $${bigMoneyFormat(Data.totalValue)}`);

  gainBarsLegend(g, z);
}
