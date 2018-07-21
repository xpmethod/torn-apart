import { select } from "d3-selection";
import _ from "lodash";
import L from "leaflet";
import { scaleLog } from "d3-scale";
import Data from "../../data/wcs/lines.csv";
import leafletD3Svg from "../leaflet-d3-svg";
import linesConstants from "./constants";

export default function (map) {
  const svg = leafletD3Svg(map, "d3-lines-svg");
  const g = svg.append("g").attr("id", "lines-g").classed("leaflet-zoom-hide", true);
  const y = scaleLog().rangeRound([0, linesConstants.rangeMax]);
  y.domain([0.1, linesConstants.yMax]); // the largest value.
  const bar = g.selectAll("g")
    .data(Data)
    .enter().append("g")
    .attr("id", d => _.camelCase(d.name))
    .each(d => d.currValue = d.y2017 + 0.1);
  bar.append("circle")
    // .attr("y", d => d.lat)
    // .attr("x", d => d.lon)
    .attr("r", 5);
  // select(this).append("g")
  //   .attr("id", `${_.camelCase(d.name)}-bar-g`) 
  //   .classed("lines-bar-g", true)
  //   .each(function(d){
  bar.append("rect")
    .attr("id", d => `${_.camelCase(d.name)}-rect`) 
    .attr("data-current-value", d => d.currValue)
    .attr("height", d => {
      d.newHeight = y(d.y2017 + 0.1); // can't have 0 as a value…
      return d.newHeight;
    })
    .attr("width", linesConstants.barWidth)
    .attr("transform", d => `translate(-${linesConstants.barWidth/2},-${d.newHeight})`);
  // bar.append("line")
  //   .attr("stroke", "white")
  //   .attr("stroke-width", 2)
  //   .attr("x1", 0)
  //   .attr("y1", 0)
  //   .attr("x2", linesConstants.barWidth)
  //   .attr("y2", 0)
  //   .attr("transform", d => `translate(-${linesConstants.barWidth/2},${d.newHeight - y(10)})`);

  // bar.append("text")
  //   .style("fill", "white")
  //   .attr("dy", d => y(d.currValue + 10))
  //   .text("10");
  // });
  // g.selectAll("g")

  d3Update();

  map.on("zoomend", d3Update);

  function d3Update(){
    const tL = new L.LatLng(70, -170);
    const bR = new L.LatLng(10, 150);
    const bottomRight = [map.latLngToLayerPoint(bR).x, map.latLngToLayerPoint(bR).y];
    const topLeft = [map.latLngToLayerPoint(tL).x, map.latLngToLayerPoint(tL).y];
    svg .attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");

    g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
    select("#lines-g").selectAll("g").attr("transform", function(d) {
      // const height = select(this).select("rect").attr("height");
      const LL = new L.LatLng(d.lat, d.lon);
      d.newX = map.latLngToLayerPoint(LL).x;
      d.newY = map.latLngToLayerPoint(LL).y;
      return `translate(${d.newX},${d.newY})`;
    });
    // select("#lines-g").selectAll("g").selectAll("line")
    //   .attr("transform", function(d) {
    //     return `translate(${d.newX},${d.newY})`;
    //   });
  }
}

