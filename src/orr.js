import $ from "jquery";
import { select } from "d3-selection";
import { max } from "d3-array";
import { randomNormal } from "d3-random";
import { forceSimulation, forceCollide, forceManyBody, forceCenter, forceY, forceX } from "d3-force";
import orrData from "./orr/data";
import { lower48Bounds } from "./constants";

export default function(map) {
  $(map).css("cursor", "grab");  
  $("#orr-legend").show().click(function(){ $(this).hide(); });
  $("#orr-div").show();
  map.flyToBounds(lower48Bounds);
  const svg = select("#orr-div").append("svg")
      .attr("width", $( window ).width())
      .attr("height",$( window ).height()),
    g = svg.append("g");//.classed("leaflet-zoom-hide", true).classed("chartLayer", true);

  const data = orrData();
  data.map( datum => {
    const dg = g.append("g").attr("id", datum.dco).classed("nodes", true);
    const x = map.latLngToLayerPoint(datum.LatLng).x;
    const y = map.latLngToLayerPoint(datum.LatLng).y;
    const simulation = forceSimulation()
      .force("collide", forceCollide(d => max([6, Math.pow(d.r, 0.62)])).iterations(16))
      .force("charge", forceManyBody())
      .force("center", forceCenter(x, y))
      .force("y", forceY(0))
      .force("x", forceX(0));

    const node = dg.selectAll("circle")
      .data(datum.blacksites).enter().append("circle")
      .attr("r", d => max([6, Math.pow(d.r, 0.6)]))
      .attr("stroke", "rgba(255,255,255,0.25)")
      .attr("stroke-width", 3)
      .on("tap", fleeMouse)
      .on("touch", fleeMouse)
      .on("mouseover", fleeMouse);

    const ticked = function() {
      node.attr("cx", d => d.x).attr("cy", d => d.y);
    };

    simulation
      .nodes(datum.blacksites)
      .on("tick", ticked);
  });
}

function fleeMouse(){
  select(this).attr("transform", `translate(${randomNormal(0, 25)()},${randomNormal(0, 25)()})`); 
}

