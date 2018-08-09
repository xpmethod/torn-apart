import L from "leaflet";
// import _ from "lodash";
// import { format } from "d3-format";
// import { select } from "d3-selection";
import { geoPath, geoTransform } from "d3-geo";
import { scaleThreshold } from "d3-scale";
import { ckmeans } from "simple-statistics";
// import { handleMouseOver, handleMouseOut } from "../tooltip";
import addGlowFilter from "../add-glow-filter";
import congressionalDistricts from "../../data/districts/fat_districts.geo.json";
import leafletD3Svg from "../leaflet-d3-svg";
import { orange, purple, green, opacityRange5 } from "../constants";
// import { getOrdinal } from "../utils";
import districtsLegend from "./legend";

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
      // const state = _.find(states, { stateFP: d.properties.STATEFP }).name;
      // d.id = state + "-" + d.properties.CD115FP + "-" + Math.floor(Math.random() * 10);
      // if(d.properties.CD115FP === "00"){
      //   d.districtName = "At-large";
      // } else {
      //   const districtNumber = _.toInteger(d.properties.CD115FP);
      //   d.districtName = getOrdinal(districtNumber);
      // }
      // d.tooltip = `${ state } - ${ d.districtName} District <br />
      //  $${ format(",")(Math.floor(Math.random() * 1000)) } per resident`;
      // d.mouseOver = () => {
      //   select(`#${ d.id }`)
      //     .attr("filter", "url(#filter-glow-districts)");
      // };
      // d.mouseOut = () => {
      //   select(`#${ d.id }`)
      //     .attr("filter", "");
      // };
      d.color = purple;
      if(d.properties.party.match("D")) d.color = green;
      if(d.properties.party.match("N")) d.color = orange;
    })
    .style("pointer-events", "painted")
    .classed("viz-hide", true)
    .attr("fill", d => d.color)
    .attr("fill-opacity", d => opacity(d.properties.total_value))
    .style("stroke", d => d.color)
    .style("stroke-opacity", 0.8)
    // .on("mouseover", handleMouseOver)
    // .on("mouseout", handleMouseOut);
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
