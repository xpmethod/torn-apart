import $ from "jquery";
import L from "leaflet";
import { defaultRadius } from "./utils";
import { select } from "d3-selection";
import iceFacs from "./ice-facilities.json";
import detCtrs from "./detention-centers.json";

export default function(map) {
  const radius = defaultRadius();
  const svg = select(map.getPanes().overlayPane).append("svg")
    .style("z-index", 210)
    .style("pointer-events", "none")
    .attr("width", $( window ).width())
    .attr("height", $( window ).height())
    .classed("viz-hide", true)
    .attr("id", "d3-dots-svg");
  const iceG = svg.append("g").attr("id", "ice-g").classed("leaflet-zoom-hide", true);
  const dcG = svg.append("g").attr("id", "dc-g").classed("leaflet-zoom-hide", true);
  iceG.selectAll("circle")
    .data(iceFacs.filter(d => d.lat !== "NA"))
    .enter().append("circle")
    .style("stroke", "black")
    .attr("class", d => {
      const code = d["Facility.Operator"];
      let group = "GOVT";
      ["AHTNA (GUARD)", "M&TC", "ICA", "LASALLE CORRECTIONS", "AGS", "AKAL", "CEC", "MVM"].forEach(operator => {
        if(operator === code){ 
          group = "OPRIV"; 
        }
      });
      ["CCA", "GEO", "ORR"].forEach(operator => { if(operator === code) group = operator; });
      return group;
    })
    .classed("orange-dot", true)
    .classed("ice-dot", true)
    .attr("data-operator", d => d["Facility.Operator"])
    .attr("id", d => d["DETLOC"] + "-dot")
    .attr("r", radius * 2);
  dcG.selectAll("circle")
    .data(detCtrs)
    .enter().append("circle")
    .style("stroke", "black")
    .classed("purple-dot", true)
    .classed("dc-dot", true)
    .attr("data-operator", d => d["Owner"])
    .attr("id", d => d["DETLOC"] + "-dot")
    .attr("r", radius * 1.5);

  map.on("zoomend", d3Update);
  d3Update();

  function d3Update(){
    [select("#ice-g").selectAll("circle"),
      select("#dc-g").selectAll("circle")].forEach(feature => {
      feature.attr("transform", d => {
        const LL = new L.LatLng(d.lat, d.lon);
        // const pp = map.latLngToLayerPoint(LL);
        return `translate(${map.latLngToLayerPoint(LL).x},${map.latLngToLayerPoint(LL).y})`;
      });
    });
  }
}


