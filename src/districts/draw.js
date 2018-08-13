import L from "leaflet";
// import _ from "lodash";
// import { format } from "d3-format";
import { select } from "d3-selection";
import { geoPath, geoTransform } from "d3-geo";
import { scaleThreshold } from "d3-scale";
import { ckmeans } from "simple-statistics";
import addGlowFilter from "../add-glow-filter";
import congressionalDistricts from "../../data/districts/fat_districts.geo.json";
import leafletD3Svg from "../leaflet-d3-svg";
import { orange, purple, green, opacityRange5 } from "../constants";
import districtsLegend from "./legend";
import { handleMouseOver, handleMouseOut } from "../tooltip";
import districtsTooltip from "./tooltip";

export default function(map){
  const svg = addGlowFilter(leafletD3Svg(map, "d3-districts-svg"));
  const g = svg.append("g").attr("class", "leaflet-zoom-hide");
  const transform = geoTransform({ point: projectPoint }),
    path = geoPath().projection(transform);
  const bins = ckmeans(congressionalDistricts.features.map(d => d.properties.total_value), 5);
  bins.shift();
  districtsLegend(bins);
  const opacity = scaleThreshold()
    .domain(bins.map(bin => bin[0]))
    .range(opacityRange5);

  const feature = g.selectAll("path").data(congressionalDistricts.features)
    .enter().append("path")
    .each(d => {
      d.tooltip = (districtsTooltip(d));
      d.mouseOver = () => true;
      d.mouseOut = () => true;
      d.color = purple;
      if(d.properties.party.match(/D/)) d.color = green;
      if(d.properties.party.match(/N/)) d.color = orange;
    })
    .style("pointer-events", "painted")
    .attr("fill", d => d.color)
    .attr("fill-opacity", d => opacity(d.properties.total_value))
    .style("stroke", d => d.color)
    .style("stroke-opacity", 0.8)
    .on("mouseover", function(d){
      select(this)
        .attr("fill-opacity", 1)
        .attr("filter", "url(#filter-glow-districts)");
      handleMouseOver(d);
    })
    .on("mouseout", function(d){
      select(this)
        .attr("fill-opacity", d => opacity(d.properties.total_value))
        .attr("filter", "");
      handleMouseOut(d);
    })
    .attr("id", d => d.id);
  
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
