import L from "leaflet";
import { scaleThreshold } from "d3-scale";
import { geoPath, geoTransform } from "d3-geo";
import tip from "d3-tip";
import addGlowFilter from "../add-glow-filter";
import aorVoronoi from "./aor-voronoi.geo.json";
import leafletD3Svg from "../leaflet-d3-svg";
import { slug } from "../utils";

export default function(map) {
  const svg = addGlowFilter(leafletD3Svg(map, "d3-beds-svg"));
  const g = svg.append("g").attr("class", "leaflet-zoom-hide");
  const theTip = tip()
    .attr("class", "tooltip")
    .offset([-10, 0])
    .html(d => d.properties.name);
  svg.call(theTip);
  const transform = geoTransform({ point: projectPoint }),
    path = geoPath().projection(transform);
  const scale = scaleThreshold()
    .domain([75, 105, 130, 150])
    .range([0, 0.4, 0.6, 0.8, 1]);
  const feature = g
    .selectAll("path")
    .data(aorVoronoi.features)
    .enter()
    .append("path")
    .each(d => {
      d.id = `${slug(d.properties.name)}-voronoi`;
    })
    .style("pointer-events", "painted")
    .attr("id", d => d.id)
    .classed("viz-hide", true)
    .classed("districts-polygon", true)
    .attr("opacity", d => scale(d.properties.cost2019))
    .on("mouseover", theTip.show)
    .on("mouseout", theTip.hide);

  reset();
  map.on("zoomend", reset);

  function reset() {
    const bounds = path.bounds(aorVoronoi),
      topLeft = bounds[0],
      bottomRight = bounds[1];
    svg
      .attr("width", bottomRight[0] - topLeft[0])
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
