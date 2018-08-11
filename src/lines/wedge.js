import { handleMouseOver, handleMouseOut } from "../tooltip";
import { select } from "d3-selection";
import "d3-transition";
import _ from "lodash";
import L from "leaflet";
// import { scaleLog } from "d3-scale";
import addGlowFilter from "../add-glow-filter";
import Data from "../../data/wcs/lines.csv";
import leafletD3Svg from "../leaflet-d3-svg";
import { purple } from "../constants";
import linesConstants from "./constants";
// import linesDrawScale from "./draw-scale";
// import linesScale from "./scale";
import linesLogScale from "./log-scale";
import linesCalcAngles from "./calculate-angles";

// const unknowns = {
//   y2012: 879,
//   y2013: 824,
//   y2014: 281,
//   y2015: 150,
//   y2016: 176,
//   y2017: 190,
//   y2018: 8,
//   name: "Unknown"
//   };

export default function (map) {
  const svg = addGlowFilter(leafletD3Svg(map, "d3-lines-svg"));
  const g = svg.append("g").attr("id", "lines-g").classed("leaflet-zoom-hide", true);
  const y = linesLogScale();
  const bar = g.selectAll("g")
    .data(Data)
    .enter().append("g")
    .attr("id", d => _.camelCase(d.name))
    .each(linesCalcAngles)
    .each(d => {
      d.currYear = 2017;
      d.currValue = d.y2017 + 0.1;
      d.color = purple;
      if(d.currValue < 2 && d.currValue > 0.2){ 
        d.tooltip = linesConstants.tooltipSingular(d);
      } else { 
        d.tooltip = linesConstants.tooltipPlural(d);
      }
      d.mouseOver = () => {
        select(`#${_.camelCase(d.name)}-path`)
          .attr("fill", d.color)
          .attr("filter", "url(#filter-glow-lines)");
      };
      d.mouseOut = () => {
        select(`#${_.camelCase(d.name)}-path`)
          .attr("fill", "black")
          .attr("filter", "");
      };
    });
  bar.append("path")
    .style("pointer-events", "painted")
    .attr("id", d => `${_.camelCase(d.name)}-path`)
    .attr("fill", "black")
    .attr("opacity", d => d.currValue)
    .attr("d", d => {
      d.newHeight = y(d.y2017 + 0.1); // can't have 0 as a value…
      const scaleFactor = d.newHeight / linesConstants.rangeMax;
      return `M0 0 V -${d.newHeight} H ${scaleFactor * linesConstants.barWidth} Z`;
    })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
  // linesScale(bar, y);

  d3Update();

  map.on("zoomend", d3Update);

  function d3Update(){
    const toothLength = 30;
    const tL = new L.LatLng(70, -170);
    const bR = new L.LatLng(10, 150);
    const bottomRight = [map.latLngToLayerPoint(bR).x, map.latLngToLayerPoint(bR).y];
    const topLeft = [map.latLngToLayerPoint(tL).x, map.latLngToLayerPoint(tL).y];
    svg.attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");
    g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
    select("#lines-g").selectAll("g").attr("transform", d => {
      const LL = new L.LatLng(d.lat, d.lon);
      d.newX = map.latLngToLayerPoint(LL).x;
      d.newY = map.latLngToLayerPoint(LL).y;
      return `rotate(${d.angle}, ${d.newX}, ${d.newY}) translate(${d.newX},${d.newY + toothLength})`;
    });
  }
}
