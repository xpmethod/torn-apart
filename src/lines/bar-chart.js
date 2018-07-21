import { select, selectAll } from "d3-selection";
import _ from "lodash";
import L from "leaflet";
import { scaleLog } from "d3-scale";
import Data from "../../data/wcs/lines.csv";
import leafletD3Svg from "../leaflet-d3-svg";

export default function (map) {
  const svg = leafletD3Svg(map, "d3-lines-svg");
  const g = svg.append("g").attr("id", "lines-g").classed("leaflet-zoom-hide", true);
  const y = scaleLog().rangeRound([50, 0]);
  y.domain([1, 57296]); // the largest value.
  g.selectAll("g")
    .data(Data)
    .enter().append("g")
    .attr("id", d => _.camelCase(d.name))
    .each(function(d){
      select(this).append("circle")
        .attr("y", d.lat)
        .attr("x", d.lon)
        .attr("r", 5);
      // select(this).append("g")
      //   .attr("id", `${_.camelCase(d.name)}-bar-g`) 
      //   .classed("lines-bar-g", true)
      //   .each(function(d){
      select(this).append("rect")
        .attr("id", `${_.camelCase(d.name)}-rect`) 
        .attr("height", y(d.y2017 + 0.1)) // can't have 0 as a value in log.
        .attr("width", 16);
    });
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
    select("#lines-g").selectAll("g").selectAll("circle").attr("transform", d => {
      const LL = new L.LatLng(d.lat, d.lon);
      return `translate(${map.latLngToLayerPoint(LL).x},${map.latLngToLayerPoint(LL).y})`;
    });
    // selectAll(".lines-bar-g")
    select("#lines-g").selectAll("g").selectAll("rect").attr("transform", function(d) {
      const height = select(this).attr("height");
      const LL = new L.LatLng(d.lat, d.lon);
      return `translate(${map.latLngToLayerPoint(LL).x - 8},${map.latLngToLayerPoint(LL).y - height })`;
    });
  }
}

