import $ from "jquery";
import _ from "lodash";
import { select } from "d3-selection";
import { sum } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleBand, scaleLinear } from "d3-scale";
import addGlowFilter from "../../add-glow-filter";
import { bigMoneyFormat } from "../../utils";
import { purple, green, orange } from "../../constants";
import districtsLegend from "./legend";
import Data from "../../../data/districts/fat_districts.csv";

export default function() {
  const margins = { left: 35, bottom: 20 };
  const data = _(Data)
    .sortBy(["total_awards"])
    .filter(d => d.total_awards > 0)
    .reverse()
    .value();
  const total = sum(data.map(d => d.total_awards));
  const width = $("#districts-div").width();
  const height = 0.66 * width;

  const x = scaleBand()
    // .range([0, width - 20])
    .rangeRound([0, width - margins.left])
    .paddingInner(0.05)
    .align(0.1)
    .domain(data.map((d, i) => i));
  const y = scaleLinear()
    .rangeRound([height - margins.bottom, 0])
    .domain([0, total]);

  const svg = select("#districts-svg")
    .attr("height", height)
    .attr("width", width);
  addGlowFilter(svg);
  svg
    .append("g")
    .attr("transform", `translate(${margins.left},0)`)
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", d => {
      if (d.party === "republican") {
        return purple;
      } else if (d.party === "democrat") {
        return green;
      } else {
        return orange;
      }
    })
    .each((d, i) => {
      d.cumulativeAwards =
        i === 0
          ? d.total_awards
          : data[i - 1].cumulativeAwards + d.total_awards;
    })
    .attr("y", d => y(d.cumulativeAwards))
    .attr("x", (d, i) => x(i) - 32)
    .attr("height", d => height - margins.bottom - y(d.total_awards))
    .attr("width", 15 * x.bandwidth())
    .on("mouseover", function(d) {
      select(this).attr("filter", "url(#filter-glow-districts)");
      const rep = d.representative ? ", Rep. " + d.representative : "";
      const dist =
        d.districtNumber === 0
          ? $.i18n(d.districtName)
          : $.i18n(d.districtName).replace(/N/, d.districtNumber) + " District";
      select("#district-text").text(
        `${d.state} ${dist}${rep}, $${bigMoneyFormat(d.total_awards)}`
      );
    })
    .on("mouseout", function() {
      select(this).attr("filter", null);
      select("#district-text").text("No selected district.");
    });

  svg
    .append("g")
    .classed("axis", true)
    .attr("transform", `translate(${margins.left},0)`)
    .call(axisLeft(y).tickArguments([null, "s"]));

  svg
    .append("g")
    .classed("axis", true)
    .attr("transform", `translate(${margins.left},${height - margins.bottom})`)
    .call(axisBottom(x).tickValues([]));

  svg
    .selectAll(".tick")
    .select("text")
    .text(d => `$${bigMoneyFormat(d)}`);

  districtsLegend(height, width);
}
