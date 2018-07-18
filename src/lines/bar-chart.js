import { select } from "d3-selection";
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
    .append("circle")
    // .attr("class", "bar")
    .attr("y", d => d.lat)
    .attr("x", d => d.lon)
    .attr("r", 5);
  g.selectAll("g")
    .append("rect")
    .attr("id", d => `${_.camelCase(d.name)}-rect`) 
    // .attr("height", 10)
    .attr("height", d => y(d[2017]))
    .attr("width", 5);

  d3Update();

  map.on("zoomend", d3Update);

  function d3Update(){
    select("#lines-g").selectAll("g").selectAll("circle").attr("transform", d => {
      const LL = new L.LatLng(d.lat, d.lon);
      return `translate(${map.latLngToLayerPoint(LL).x},${map.latLngToLayerPoint(LL).y})`;
    });
    select("#lines-g").selectAll("g").selectAll("rect").attr("transform", d => {
      const LL = new L.LatLng(d.lat, d.lon);
      return `translate(${map.latLngToLayerPoint(LL).x},${map.latLngToLayerPoint(LL).y})`;
    });
  }
}

