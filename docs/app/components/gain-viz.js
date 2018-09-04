import Component from "@ember/component";
import { run } from "@ember/runloop";
import { set, get } from "@ember/object";
import _ from "lodash";
import { select, selectAll } from "d3-selection";
import { stack } from "d3-shape";
import { axisLeft, axisBottom } from "d3-axis";
import { scaleBand, scaleOrdinal, scaleLinear } from "d3-scale";
import layout from "../templates/components/gain-viz";
import colors from "../mixins/colors";
import wrap from "../visualizations/wrap";
import Data from "../data/gain/minority";
import gainBabyBars from "../visualizations/gain/baby-bars";

// import Tip from "d3-tip";
// import wrap from "../wrap";
// import { bigMoneyFormat } from "../utils";
// import { green, orange, pink, lime, beige, tan, lavender } from "../constants";
// import rainLegend from "../helpers/rain/legend";

export default Component.extend(colors, {
  layout,
  tagName: "svg",
  width: 720,
  height: 300,
  attributeBindings: ["width", "height"],
  init() {
    this._super();
    this.data = Data;
  },
  didInsertElement() {
    this._super();
    set(
      this,
      "width",
      this.$()
        .parents("div")
        .width()
    );
    set(
      this,
      "height",
      this.$()
        .parents("div")
        .height() // - $("#rain-header").height()
    );
  },
  didReceiveAttrs() {
    run.scheduleOnce("render", this, this.drawGain);
  },
  drawGain() {
    const height = get(this, "height");
    const width = get(this, "width");
    const data = get(this, "data");
    const keys = data.minorityCategories;
    console.log(data, keys);
    const countData = [{ type: "minority" }, { type: "women" }];
    _.each(keys, cat => {
      countData[0][cat] = data.minorityContractors[cat].count;
      countData[1][cat] = data.intersectionalContractors[cat]
        ? data.intersectionalContractors[cat].count
        : 0;
    });
    const valueData = [{ type: "minority" }, { type: "women" }];
    _.each(keys, cat => {
      valueData[0][cat] = data.minorityContractors[cat].value;
      valueData[1][cat] = data.intersectionalContractors[cat].value;
    });
    keys.push("female");
    countData[1].female = data.minorityContractors.female.count;
    valueData[1].female = data.minorityContractors.female.value;

    const svg = select(this.element)
      .attr("height", height)
      .attr("width", width);
    const margins = { bottom: 35, left: 65, right: 5 };
    const g = svg.append("g").attr("transform", `translate(${margins.left},0)`);
    // const tip = Tip()
    //   .attr("class", "tooltip")
    //   .offset([-10, 0])
    //   .html(tooltip);
    // svg.call(tip);

    const colors = [
      get(this, "green"),
      get(this, "orange"),
      get(this, "pink"),
      get(this, "lime"),
      get(this, "beige"),
      get(this, "tan"),
      get(this, "lavender")
    ];
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
        // })
        // .on("mouseover", function(d) {
        //   tip.show(d, this);
        // })
        // .on("mouseout", function(d) {
        //   tip.hide(d, this);
      });

    g.append("g")
      .attr("class", "axis y-axis")
      .call(axisLeft(y))
      .selectAll(".tick text")
      .text(d => `ta-${d}-owned-label`)
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
      .text("ta-total-number-of-contractors");

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
        // })
        // .on("mouseover", function(d) {
        //   tip.show(d, this);
        // })
        // .on("mouseout", function(d) {
        //   tip.hide(d, this);
      });

    value
      .append("g")
      .attr("class", "axis y-axis")
      .call(axisLeft(y))
      .selectAll(".tick text")
      .text(d => `ta-${d}-owned-label`)
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
      .text("ta-total-value-of-awards-since-2014");

    valueText.style("text-anchor", "middle");

    selectAll(".wrapped").call(wrap, { width: margins.left - 9 });

    // const babyValue = g.append("g");

    // gainBarsLegend(g, z);

    selectAll(".gain-value-axis")
      .selectAll("text")
      .text(function() {
        return select(this)
          .text()
          .replace(/G/, "B");
      });

    gainBabyBars({
      z,
      g,
      value,
      countData,
      valueData,
      height,
      margins,
      width,
      valueX,
      countX,
      data
    });
  }
});
