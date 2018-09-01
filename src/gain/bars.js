import $ from "jquery";
import _ from "lodash";
import { select, selectAll } from "d3-selection";
import { stack } from "d3-shape";
import { format } from "d3-format";
import { axisLeft, axisBottom } from "d3-axis";
import { scaleBand, scaleOrdinal, scaleLinear } from "d3-scale";
import Tip from "d3-tip";
import wrap from "../wrap";
import { bigMoneyFormat } from "../utils";
import { green, orange, pink, lime, beige, tan, lavender } from "../constants";
import spinner from "../spinner";
// import gainBarsLegend from "./bars-legend";
import Data from "../../data/gain/minority-data.json";

export default function(width, height) {
  const keys = Data.minorityCategories;
  const countData = [{ type: "minority" }, { type: "women" }];
  _.each(Data.minorityCategories, cat => {
    countData[0][cat] = Data.minorityContractors[cat].count;
    countData[1][cat] = Data.intersectionalContractors[cat]
      ? Data.intersectionalContractors[cat].count
      : 0;
  });
  const valueData = [{ type: "minority" }, { type: "women" }];
  _.each(Data.minorityCategories, cat => {
    valueData[0][cat] = Data.minorityContractors[cat].value;
    valueData[1][cat] = Data.intersectionalContractors[cat].value;
  });
  keys.push("female");
  countData[1].female = Data.minorityContractors.female.count;
  valueData[1].female = Data.minorityContractors.female.value;

  const svg = select("#gain-bars-svg")
    .attr("height", height)
    .attr("width", width);
  const margins = { bottom: 35, left: 65, right: 5 };
  const g = svg.append("g").attr("transform", `translate(${margins.left},0)`);
  const tip = Tip()
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(tooltip);
  svg.call(tip);

  const colors = [green, orange, pink, lime, beige, tan, lavender];
  const y = scaleBand()
    .rangeRound([0, height / 2 - margins.bottom])
    .domain(["minority", "women"])
    .paddingInner(0.05)
    .align(0.1);
  const countX = scaleLinear()
    .range([0, width - margins.left - margins.right])
    .domain([0, 0.4 * Data.totalParents]);
  const valueX = scaleLinear()
    .range([0, width - margins.left - margins.right])
    .domain([0, 0.4 * Data.totalValue]);
  const z = scaleOrdinal()
    .range(colors)
    .domain(keys);

  g.append("g")
    .attr("id", "count-bars")
    .selectAll("g")
    .data(stack().keys(Data.minorityCategories)(countData))
    .enter()
    .append("g")
    .attr("fill", d => z(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .each(function(d) {
      const color = select(this.parentNode).attr("fill");
      d.category = Data.minorityCategories[_.indexOf(colors, color)];
    })
    .attr("y", d => y(d.data.type))
    .attr("x", d => countX(d[0]))
    .attr("height", y.bandwidth())
    .attr("width", d => {
      if (_.isNaN(countX(d[1]) - countX(d[0]))) {
        return 0;
      } else {
        return countX(d[1]) - countX(d[0]);
      }
    })
    .on("mouseover", function(d) {
      tip.show(d, this);
    })
    .on("mouseout", function(d) {
      tip.hide(d, this);
    });

  g.append("g")
    .attr("class", "axis y-axis")
    .call(axisLeft(y))
    .selectAll(".tick text")
    .text(d => $.i18n(`ta-${d}-owned-label`))
    .classed("wrapped", true)
    .attr("data-i18n", d => `ta-${d}-owned-label`)
    .attr("data-wrap-align", "vertical")
    .attr("data-wrap-width", margins.left - 9);

  g.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height / 2 - margins.bottom})`)
    .call(axisBottom(countX));

  const countText = g
    .append("text")
    .attr(
      "transform",
      `translate(${width / 2},${height / 2 - margins.bottom + 30})`
    )
    .attr("data-i18n", "ta-total-number-of-contractors")
    .text($.i18n("ta-total-number-of-contractors"));

  countText.style("text-anchor", "middle");

  const value = g
    .append("g")
    .attr("id", "value-bars")
    .attr("transform", `translate(0, ${height / 2 + 5})`);

  value
    .selectAll("g")
    .data(stack().keys(Data.minorityCategories)(valueData))
    .enter()
    .append("g")
    // .each(d => console.log(d))
    .attr("fill", d => z(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .each(function(d) {
      const color = select(this.parentNode).attr("fill");
      d.category = Data.minorityCategories[_.indexOf(colors, color)];
    })
    .attr("y", d => y(d.data.type))
    .attr("x", d => valueX(d[0]))
    .attr("height", y.bandwidth())
    .attr("width", d => {
      if (_.isNaN(valueX(d[1]) - valueX(d[0]))) {
        return 0;
      } else {
        return valueX(d[1]) - valueX(d[0]);
      }
    })
    .on("mouseover", function(d) {
      tip.show(d, this);
    })
    .on("mouseout", function(d) {
      tip.hide(d, this);
    });

  value
    .append("g")
    .attr("class", "axis y-axis")
    .call(axisLeft(y))
    .selectAll(".tick text")
    .text(d => $.i18n(`ta-${d}-owned-label`))
    .classed("wrapped", true)
    .attr("data-i18n", d => `ta-${d}-owned-label`)
    .attr("data-wrap-align", "vertical")
    .attr("data-wrap-width", margins.left - 9);

  value
    .append("g")
    .attr("class", "axis gain-value-axis")
    .attr("transform", `translate(0,${height / 2 - margins.bottom})`)
    .call(axisBottom(valueX).ticks(null, "$s"));

  const valueText = value
    .append("text")
    .attr(
      "transform",
      `translate(${width / 2},${height / 2 - margins.bottom + 30})`
    )
    .attr("data-i18n", "ta-total-value-of-awards-since-2014")
    .text($.i18n("ta-total-value-of-awards-since-2014"));

  valueText.style("text-anchor", "middle");

  selectAll(".wrapped").call(wrap, { width: margins.left - 9 });

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
      width - margins.left - margins.right - countX(0.3 * Data.totalParents)
    ])
    .domain([0, Data.totalParents]);

  const babyValueX = scaleLinear()
    .range([
      0,
      width - margins.left - margins.right - valueX(0.3 * Data.totalValue)
    ])
    .domain([0, Data.totalValue]);

  const babyCount = g
    .append("g")
    .attr("id", "baby-count")
    .attr("transform", `translate(${countX(0.3 * Data.totalParents)}, 0)`);

  const babyValue = value
    .append("g")
    .attr("id", "baby-value")
    .attr("transform", `translate(${valueX(0.3 * Data.totalValue)}, 0)`);

  babyCount
    .selectAll("g")
    .data(stack().keys(Data.minorityCategories)(countData))
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
    .attr("d", `M ${babyCountX(Data.totalParents)},0 V ${babyHeight}`);

  babyCount
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${babyHeight})`)
    .call(axisBottom(babyCountX).ticks(babyTicks));

  babyCount
    .append("text")
    .attr(
      "transform",
      `translate(${babyCountX(Data.totalParents) - 10}, 0)rotate(-90)`
    )
    .style("text-anchor", "end")
    .text(`${$.i18n("ta-total")}: ${Data.totalParents}`);

  babyValue
    .selectAll("g")
    .data(stack().keys(Data.minorityCategories)(valueData))
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
    .attr("d", `M ${babyValueX(Data.totalValue)},0 V ${babyHeight}`);

  babyValue
    .append("text")
    .attr(
      "transform",
      `translate(${babyValueX(Data.totalValue) - 10}, 0)rotate(-90)`
    )
    .style("text-anchor", "end")
    .text(`${$.i18n("ta-total")}: $${bigMoneyFormat(Data.totalValue)}`);

  // const babyValue = g.append("g");

  // gainBarsLegend(g, z);

  selectAll(".gain-value-axis")
    .selectAll("text")
    .text(function() {
      return select(this)
        .text()
        .replace(/G/, "B");
    });

  spinner.stop();

  function tooltip(d) {
    // console.log(d);
    if (d.data.type === "women" && d.category !== "female") {
      return `<h3>${$.i18n(`ta-${d.category}-women-owned-contractors`)}</h3>
      <ul>
        <li>${Data.intersectionalContractors[d.category].count} ${$.i18n(
        "ta-contractors-out-of-N-total"
      ).replace(/N/, Data.totalParents)} (${format(",.1%")(
        Data.intersectionalContractors[d.category].count / Data.totalParents
      )}).</li>
        <li>$${bigMoneyFormat(
          Data.intersectionalContractors[d.category].value
        )} ${$.i18n("ta-dollars-out-of-N-in-ICE-awards-since-2014").replace(
        /N/,
        bigMoneyFormat(Data.totalValue)
      )} (${format(",.1%")(
        Data.intersectionalContractors[d.category].value / Data.totalValue
      )}).</li>
	  <li>${$.i18n("ta-women-biggest-profiteer")}: ${
        Data.biggestProfiteers.female.name
      }, <strong>$${bigMoneyFormat(
        Data.biggestProfiteers.female.value
      )}</strong></li>
      </ul>
        `;
    } else {
      return `<h3>${$.i18n(`ta-${d.category}-owned-contractors`)}</h3>
      <ul>
        <li>${Data.minorityContractors[d.category].count} ${$.i18n(
        "ta-contractors-out-of-N-total"
      ).replace(/N/, Data.totalParents)} (${format(",.1%")(
        Data.minorityContractors[d.category].count / Data.totalParents
      )}).</li>
        <li>$${bigMoneyFormat(
          Data.minorityContractors[d.category].value
        )} ${$.i18n("ta-dollars-out-of-N-in-ICE-awards-since-2014").replace(
        /N/,
        bigMoneyFormat(Data.totalValue)
      )} (${format(",.1%")(
        Data.minorityContractors[d.category].value / Data.totalValue
      )}).</li>
	  <li>${$.i18n("ta-districts-biggest-profiteer")}: ${
        Data.biggestProfiteers[d.category].name
      }, <strong>$${bigMoneyFormat(
        Data.biggestProfiteers[d.category].value
      )}</strong></li>
      </ul>
        `;
    }
  }
}
