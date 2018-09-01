import L from "leaflet";
import { select } from "d3-selection";
import { defaultRadius } from "../utils";
import leafletD3Svg from "../leaflet-d3-svg";
import Data from "./list.csv";

export default function(map) {
  const radius = defaultRadius() * 2;
  const svg = leafletD3Svg(map, "d3-allies-svg");
  const g = svg
    .append("g")
    .attr("id", "allies-g")
    .classed("leaflet-zoom-hide", true);
  g.selectAll("circle")
    .data(Data.filter(d => d.lat))
    .enter()
    .append("circle")
    .style("stroke", "black")
    .classed("green-dot", true)
    // .attr("id", d => d.DETLOC + "-dot")
    .attr("r", radius);
  map.on("zoomend", d3Update);
  d3Update();

  function d3Update() {
    select("#allies-g")
      .selectAll("circle")
      .attr("transform", d => {
        const LL = new L.LatLng(d.lat, d.lon);
        return `translate(${map.latLngToLayerPoint(LL).x},${
          map.latLngToLayerPoint(LL).y
        })`;
      });
  }
}
