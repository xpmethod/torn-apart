import _ from "lodash";
import { select, event } from "d3-selection";
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceX, forceY } from "d3-force";
import { drag } from "d3-drag";
import { zoom } from "d3-zoom";
import { green, purple, orange, pink } from "../constants";
import freezerMurderboardSidebar from "./murderboard-sidebar";
import Data from "../../data/freezer/graph.json";
import PostIt from "./post-it";
//import { scaleLog } from "d3-scale";
//import { extent } from "d3-array";
//import { color } from "d3-color";


export default function(){

  const graph = _.cloneDeep(Data);
  // Drawing options for the icons:
  const icon = {
    draw: "rect", // or "path" for svg or "image"
    shadow: false, // make true if you want a shadow on the postit svg.
    postIt: PostIt(),
    scale: 1,
    note: 1,
    side: 240 // the postit is about 240 x 240
  };
  const svg = select("#freezer-svg");
  const g = svg.append("g").attr("id", "topG");
  const width = svg.attr("width");
  const height = svg.attr("height");
  //const lw = scaleLog() //sets a scale for line width
  //  .domain(extent(Data.links
  //    .filter(links => links.contract_value > 0)
  //    .map(links => links.contract_value))
  //  )
  //  .range([25, 100]);

  // zoom handler
  const theZoom = zoom()
    .scaleExtent([0.1, 3])
    .on("zoom", zoomed);

  window.onwheel = function(){return false;};

  const forces = {
    charge: -2000,
    x: 100,
    y: 100,
    alphaDecay: .09
  };
  const simulation = forceSimulation()
    .force("link", forceLink().id( d => d.id ).distance(1500).strength(1))    // changes spacing of viz via node repulsion
    .force("charge", forceManyBody().strength(forces.charge))
    .force("center", forceCenter(width / 8, height /2))
    .force("x", forceX(forces.x))
    .force("y", forceY(forces.y))
    .alphaDecay(forces.alphaDecay);

  var link = g.append("g")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .attr("class", d => d.contract_value > 0 ? "link" : "dotted-link")
    .attr("opacity", 0.9)
    .style("stroke-linecap", "round");
    //.style("stroke-width", d => d.contract_value > 0 ? lw(d.contract_value) : 25);
  //could get d.source and then search nodes for the id that matches and get its corresponding color.

  const nodes = g.append("g")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g")
    .classed("node-g", true)
    .each( d => {
      switch (d.category) {
      case "product category":
        d.color = orange;
        d.colorText = "orange";
        break;
      case "product":
        d.color = green;
        d.colorText = "green";
        break;
      case "company":
        d.color = pink;
        d.colorText = "pink";
        break;
      case "parent company":
        d.color = purple;
        d.colorText = "purple";
        break;
      }
    })
    .on("click", freezerMurderboardSidebar)
    .on("mousedown", () => event.stopPropagation )
    .call(drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  nodes.append("g")
    .attr("transform", `scale(${icon.scale})translate(-115,-110)`)
    // .attr("transform", d => `scale(${icon.scale})translate(-115,-110)`)
    .append(icon.draw);

  const icons = nodes.selectAll(icon.draw);

  if(icon.draw === "rect"){
    icons.style("fill", d => d.color)
      .attr("height", icon.side)
      .attr("width", icon.side);
  } else if(icon.draw === "path"){
    if(icon.shadow === true){
      icons.attr("opacity", 0.7)
        .style("fill", "#000000")
        .attr("filter", "url(#filter-shadow-blur-freezer)")
        .attr("d", icon.postIt[0])
        .select(function(){return this.parentNode;})
        .append("path")
        .style("fill", d => d.color)
        .attr("d", icon.postIt[1]);
    } else {
      icons.style("fill", d => d.color)
        .attr("d", icon.postIt[1]);
    }
  } else { // it's an image.
    icons.attr("xlink:href", d => `http://localhost:4000/torn-apart/assets/imgs/post-it-${d.colorText}.png`)
      .attr("height", icon.side)
      .attr("width", icon.side);

  }


  // link.style("stroke", function(d) {
  //   var color = "grey";
  //   for(var j = 0; j< graph.nodes.length; j = j+1){
  //     var targetName = d.target;
  //     if (graph.nodes[j].id === targetName)
  //     {
  //       color = graph.nodes[j].color;
  //     }
  //   }
  //   return color;
  // });

  nodes.append("title")
    .text( d => d.id );

  theZoom(svg);
  theZoom.scaleTo(svg, .0001);

  simulation
    .nodes(graph.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(graph.links);


  function ticked() {
    link
      .attr("x1", d => d.source.x )
      .attr("y1", d => d.source.y )
      .attr("x2", d => d.target.x )
      .attr("y2", d => d.target.y );

    nodes.attr("transform", d => `translate(${d.x},${d.y})`);
  }

  //adds sticky dragging
  function dragstarted(d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = d.x;
    d.fy = d.y;
  }

  //zoom function
  function zoomed()
  {
    g.attr("transform", event.transform);
  }

}
