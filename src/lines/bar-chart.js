import { select, selectAll } from "d3-selection";
import { scaleLog } from "d3-scale";
import _ from "lodash";
import L from "leaflet";
import Data from "../../data/wcs/lines.csv";
import leafletD3Svg from "../leaflet-d3-svg";

export default function (map) {
  const svg = leafletD3Svg(map, "d3-lines-svg");
  const g = svg.append("g").attr("id", "lines-g").classed("leaflet-zoom-hide", true);
  const y = scaleLog().rangeRound([200, 0]);
  y.domain([1, 27364]);//_.max(Data.map( row => row[2017] ))]);
  g.selectAll("g")
    .data(Data)
    .enter().append("g")
    .attr("id", d => _.camelCase(d.name))
    .each(function(d){
      select(this).append("circle")
        .attr("y", d.lat)
        .attr("x", d.lon)
        .attr("r", 5);
      select(this).append("g")
        .attr("id", `${_.camelCase(d.name)}-bar-g`) 
        .classed("lines-bar-g", true)
        .each(function(d){
          select(this).append("rect")
            .attr("id", `${_.camelCase(d.name)}-rect`) 
            .attr("height", y(d[2017] + 0.1)) // can't have 0 as a value in log.
            .attr("width", 16);
        });
    });
  // g.selectAll("g")

  d3Update();

  map.on("zoomend", d3Update);

  function d3Update(){
    select("#lines-g").selectAll("g").selectAll("circle").attr("transform", d => {
      const LL = new L.LatLng(d.lat, d.lon);
      return `translate(${map.latLngToLayerPoint(LL).x},${map.latLngToLayerPoint(LL).y})`;
    });
    selectAll(".lines-bar-g").selectAll("rect").attr("transform", d => {
      const LL = new L.LatLng(d.lat, d.lon);
      return `translate(${map.latLngToLayerPoint(LL).x},${map.latLngToLayerPoint(LL).y})`;
    });
  }
}

