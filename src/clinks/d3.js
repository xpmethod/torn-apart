// Load in jQuery and leaflet.
import $ from "jquery";
import L from "leaflet";
// The only d3 method we'll be importing is select, which opens up the
// .attr, .classed, etc. methods.
import { select } from "d3-selection";
// This is a constant that sits as a utility function.
import { defaultRadius } from "../utils";
// Load the data. This can be csv data, too--see src/charts-display.js
import iceFacs from "../ice-facilities.json";
import detCtrs from "../detention-centers.json";
import zeroIceFacs from "../unused-ice-facilities.json";

// map is sent to this function, and it is the variable created when running
// the command const map = L.map("mapdiv")
export default function(map) {
  const radius = defaultRadius();
  // Append an <svg></svg> layer to leaflet's overlayPane <div>. This helps
  // with hiding the layer when zooming.
  const svg = select(map.getPanes().overlayPane).append("svg")
    .style("z-index", 210)
    // make it inert. All the clicking on the map is actually served by leaflet
    // popups, not anything on d3.
    .style("pointer-events", "none")
    .attr("width", $( window ).width())
    .attr("height", $( window ).height())
    // this class means it will be hidden when showViz() runs. See src/show-viz
    .classed("viz-hide", true)
    // this gives it an id that can be used to show the layer. See src/clinks
    .attr("id", "d3-dots-svg");
  // create a <g></g> group of svg objects for eact data set.
  const iceG = svg.append("g").attr("id", "ice-g").classed("leaflet-zoom-hide", true);
  const dcG = svg.append("g").attr("id", "dc-g").classed("leaflet-zoom-hide", true);
  const zeroG = svg.append("g").attr("id", "zero-g").classed("leaflet-zoom-hide", true);
  $("#zero-g").show();
  // iterate over the #zero-g <g></g> collection. This will create a <circle>
  // SVG object for every point inside whatever data we bind the layer to.
  zeroG.selectAll("circle")
    // bind the zeroIceFacs data imported at the top, filtering out every row
    // that does not have a number for the "lat" property.
    .data(zeroIceFacs.filter(d => !isNaN(d.lat)))
    .enter().append("circle")
    .style("stroke", "black")
    // see docs/_sass/leaflet.scss for where .orange-dot is defined.
    .classed("orange-dot", true)
    // This doesn't do anything, but it makes $(".zerofac-dot").doSomething()
    // possible.
    .classed("zerofac-dot", true)
    // Give each dot a useful id value that is unique to it, as DETLOCs are
    // unique.
    .attr("id", d => d.DETLOC + "-dot")
    .attr("r", radius);
  // repeat for iceFacs data...
  iceG.selectAll("circle")
    .data(iceFacs.filter(d => d.lat !== "NA"))
    .enter().append("circle")
    .style("stroke", "black")
    // Add a programmatic class that's determined based on the value of
    // "Facility.Operator". This will help w/ the d3 transitions in charts, 
    // as we can instantly select "all govt facilities" w/ selectAll(".GOVT")
    .attr("class", d => {
      const code = d["Facility.Operator"];
      // make the default operator class ".GOVT"
      let group = "GOVT";
      // if Facility.Operator is one of these, make the class ".OPRIV" (other
      // private).
      ["AHTNA (GUARD)", "M&TC", "ICA", "LASALLE CORRECTIONS", "AGS", "AKAL", "CEC", "MVM"].map(operator => {
        if(operator === code){ 
          group = "OPRIV"; 
        }
      });
      // Or if Facility.operator is one of these, make that the class here.
      ["CCA", "GEO", "ORR"].map(operator => { if(operator === code) { group = operator; } });
      return group;
    })
    .classed("orange-dot", true)
    .classed("ice-dot", true)
    // add an additional html data attribute listing the specific operator.
    .attr("data-operator", d => d["Facility.Operator"])
    .attr("id", d => d.DETLOC + "-dot")
    // Make the radius of the dot bigger.
    .attr("r", radius * 2);
  // repeat for detention centers...
  dcG.selectAll("circle")
    .data(detCtrs)
    .enter().append("circle")
    .style("stroke", "black")
    .classed("purple-dot", true)
    .classed("dc-dot", true)
    .attr("data-operator", d => d.Owner)
    .attr("id", d => d.DETLOC + "-dot")
    .attr("r", radius * 1.5);
  // Add an event listener that fires the d3Update function whenver the zoom
  // changes on the map so that it can reproject the dots.
  map.on("zoomend", d3Update);
  // Run an initial d3Update() so it can draw the first run of dots.
  d3Update();

  // This function takes every <circle> in all three <g> groups and reprojects
  // its coordinates. This is basically boilerplate but is what makes all of
  // the above make sense.
  function d3Update(){
    [select("#ice-g").selectAll("circle"), select("#zero-g").selectAll("circle"),
      select("#dc-g").selectAll("circle")].map(feature => {
      feature.attr("transform", d => {
        const LL = new L.LatLng(d.lat, d.lon);
        return `translate(${map.latLngToLayerPoint(LL).x},${map.latLngToLayerPoint(LL).y})`;
      });
    });
  }
}


