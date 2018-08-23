import Data from "./wordCloudData.csv";
import { select } from "d3-selection";
import * as cloud from "d3-cloud";
import tip from "d3-tip";
import draw from "./draw-words";
import { fillV2DivHeight } from "../utils";

export default function(chart) {
  if (
    select("#lexical-fog-svg")
      .selectAll("text")
      .empty()
  ) {
    const width = chart.width;
    const height = fillV2DivHeight("#wall-of-gain-header");
    const svg = select("#lexical-fog-svg").attr("class", "wordcloud");
    svg
      .append("g")
      // without the transform, words would get cutoff to the left and top, they would
      // appear outside of the SVG area
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .attr("id", "wordcloud-g");
    const theTip = tip()
      .attr("class", "tooltip")
      .offset([-10, 0])
      .html(d => d.tooltip);
    svg.call(theTip);

    cloud()
      .size([width, height - height * 0.2])
      .words(Data)
      .text(function(d) {
        return d.name;
      })
      .rotate(0)
      .fontSize(function(d) {
        return Math.ceil(Math.pow(d.total_value, 0.26)) / 4 + 6;
      })
      .padding(1)
      .font("Impact")
      .on("end", draw)
      .start();

    select("#wordcloud-g")
      .selectAll("text")
      .on("mouseover", theTip.show)
      .on("mouseout", theTip.hide);
  }
}
