import _ from "lodash";
import $ from "jquery";
import { select } from "d3-selection";
import { scaleTime } from "d3-scale";
import Data from "../army_of_east.csv";
import batwingDraw from "./draw";

export default function() {
  const localData = _.cloneDeep(Data);
  const width = $("#batwing-1-div").width();
  const height = 1.5 * width;
  const firstWing = {
    svg: select("#batwing-1-svg")
      .attr("height", height)
      .attr("width", width),
    data: localData.splice(0, 12),
    x: scaleTime()
      .domain([new Date(1854, 3), new Date(1855, 3)])
      .range([0, 2 * Math.PI])
  };
  const secondWing = {
    svg: select("#batwing-2-svg")
      .attr("height", height)
      .attr("width", width),
    data: localData,
    x: scaleTime()
      .domain([new Date(1855, 3), new Date(1856, 3)])
      .range([0, 2 * Math.PI])
  };
  batwingDraw(firstWing);
  batwingDraw(secondWing);
}
