import $ from "jquery";
import { select } from "d3-selection";

export default function(map, id){
  // Append an <svg></svg> layer to leaflet's overlayPane <div>. This helps
  // with hiding the layer when zooming.
  return select(map.getPanes().overlayPane).append("svg")
    .style("z-index", 210)
    // make it inert. All the clicking on the map is actually served by leaflet
    // popups, not anything on d3.
    .style("pointer-events", "none")
    .attr("width", $( window ).width())
    .attr("height", $( window ).height())
    // this class means it will be hidden when showViz() runs. See src/show-viz
    .classed("viz-hide", true)
    // this gives it an id that can be used to show the layer. See src/clinks
    .attr("id", id);
}
