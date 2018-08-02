import L from "leaflet";
import slug from "slug";
import { select } from "d3-selection";
import { geoPath, geoTransform } from "d3-geo";
import { handleMouseOver, handleMouseOut } from "../tooltip";
import addGlowFilter from "../add-glow-filter";
import aorVoronoi from "./aor-voronoi.geo.json";
import leafletD3Svg from "../leaflet-d3-svg";

export default function(map){
  const svg = addGlowFilter(leafletD3Svg(map, "d3-beds-svg"));
  const g = svg.append("g").attr("class", "leaflet-zoom-hide");
  const transform = geoTransform({ point: projectPoint }),
    path = geoPath().projection(transform);
  const feature = g.selectAll("path").data(aorVoronoi.features)
    .enter().append("path")
    .each( d => {
      d.id = `${slug(d.properties.name)}-voronoi`;
      d.tooltip = d.properties.name;
      d.mouseOver = () => {
        select(`#${ d.id }`)
          .attr("filter", "url(#filter-glow-beds)");
      };
      d.mouseOut = () => {
        select(`#${ d.id }`)
          .attr("filter", "");
      };
    })
    .style("pointer-events", "painted")
    .attr("id", d => d.id)
    .classed("viz-hide", true)
    .classed("districts-polygon", true)
    .attr("opacity", () => {
      const bins = [0.2, 0.4, 0.6, 0.8, 1];
      return bins[Math.floor(Math.random() * Math.floor(5))];
    })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  reset();
  map.on("zoomend", reset);

  function reset() {
    const bounds = path.bounds(aorVoronoi),
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
