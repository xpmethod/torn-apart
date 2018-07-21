import L from "leaflet";
import { geoPath, geoTransform } from "d3-geo";
import congressionalDistricts from "./congressional-districts.geo.json";
import leafletD3Svg from "../leaflet-d3-svg";

export default function(map){
  const svg = leafletD3Svg(map, "d3-districts-svg");
  const g = svg.append("g").attr("class", "leaflet-zoom-hide");
  const transform = geoTransform({ point: projectPoint }),
    path = geoPath().projection(transform);
  const feature = g.selectAll("path").data(congressionalDistricts.features)
    .enter().append("path")
    .classed("viz-hide", true)
    .classed("purple-polygon", true);
  
  reset();
  map.on("zoomend", reset);

  function reset() {
    const bounds = path.bounds(congressionalDistricts),
      topLeft = bounds[0],
      bottomRight = bounds[1];
    svg.attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");
    g.attr("transform", `translate(${-topLeft[0]},${-topLeft[1]})`);
    feature.attr("d", path);
  }

  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }
}
