import _ from "lodash";
import $ from "jquery";
import { select } from "d3-selection";
import { scaleTime } from "d3-scale";
import Data from "../army_of_east.csv";
import batwingDraw from "./draw";

export default function(){

  const localData = _.cloneDeep(Data);
  const height = $(window).height() / 1.75;
  const width = $("#batwing-div").width();
  const svg = select("#batwing-div").append("svg")
    .attr("height", height)
    .attr("width", width);
  const firstWing = {
    data: localData.splice(0,12),
    title: "April 1854 – March 1855",
    g: svg.append("g")
      .attr("transform", `translate(${3 * width/4},${0.375 * height})rotate(${-90})`)
      .attr("id", "first-batwing-g"),
    x: scaleTime()
      .domain([new Date(1854, 3), new Date(1855, 3)])
      .range([0, 2 * Math.PI]),
  };
  const secondWing = {
    data: localData,
    title: "April 1855 – March 1856",
    g: svg.append("g")
      .attr("transform", `translate(${width/4},${0.375 * height})rotate(${-90})`)
      .attr("id", "second-batwing-g"),
    x: scaleTime()
      .domain([new Date(1855, 3), new Date(1856, 3)])
      .range([0, 2 * Math.PI]),
  };
  batwingDraw(firstWing, height);
  batwingDraw(secondWing, height);
}

