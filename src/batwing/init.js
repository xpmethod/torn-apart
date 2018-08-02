import $ from "jquery";
import { select } from "d3-selection";
import Data from "./army_of_east.csv";

export default function(){

  const height = $(window).height()/1.5;
  const width = $("#batwing-div").width();
  const svg = select("#batwing-div").append("svg")
    .attr("height", height)
    .attr("width", width);
  const firstWing = {
    data: Data.splice(0,12),
    g: svg.append("g")
      .attr("transform", `translate(${width/4},${height/2})`)
      .attr("id", "first-batwing-g"),
    x: scaleLinear()
      .domain([0,1025])
      .range([0, height/2]);
    a
  const firstData = Data.splice(0,12);
  // const secondData = Data;
  const firstG = svg.append("g")
    .attr("transform", `translate(${width/4},${height/2})`)
    .attr("id", "first-batwing-g")
    .data(firstData)
    .enter().append("path");




}

