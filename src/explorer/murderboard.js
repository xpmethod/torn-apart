import $ from "jquery";
import graph from "../../data/explorer/graph.json";
import { select, event } from "d3-selection";
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceX, forceY } from "d3-force";
import { drag } from "d3-drag";
import { zoomTransform, zoom } from "d3-zoom";
import { rem, green, purple, orange, pink } from "../constants";


export default function(){  
  const width = $("#explorer-div").width();
  const height = $("#v2-div").height() - $("#explorer-headers").height() - rem;

  const theZoom = zoom()
    .scaleExtent([0.1, Infinity])
    .on("zoom", zoomed); 

  const svg = select("#explorer-svg")
    .attr("width", width)
    .attr("height", height)
    .call(theZoom)
    .append("g")
    .attr("id", "topG");  
  //sets initial zoom level
  theZoom.scaleTo(select("svg"),-10);  

  window.onwheel = function(){return false;};  

  const forces = {
    charge: -4500,
    x: -500,
    y: -10000,
    alphaDecay: 0.01
  };
  const simulation = forceSimulation()
    .force("link", forceLink().id( d => d.name ))
    // changes spacing of viz via node repulsion
    .force("charge", forceManyBody().strength(forces.charge))
    .force("center", forceCenter(width / 4, height / 4)) 
    .force("x", forceX(forces.x))
    .force("y", forceY(forces.y))
    .alphaDecay(forces.alphaDecay); 

  const link = svg.append("g")
    .attr("class", "links")
    .call(zoomTransform)
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .each( d => {
      switch (d.source) {
      case "product category":
        d.color = green;
        break;
      case "product":
        d.color = purple;
        break;
      case "company":
        d.color = orange;
        break;
      case "parent company":
        d.color = pink; 
        break;
      } 
    })
  //change edge color based on property
    .style("stroke", d => d.color);

  var node = svg.append("g")
    .attr("class", "nodes")
    .call(zoomTransform)
    .selectAll("rect")
    .data(graph.nodes)
    .enter().append("rect")
    .each( d => {
      switch (d.category) {
      case "product category":
        d.color = green;
        d.side = 240;
        break;
      case "product":
        d.color = purple;
        d.side = 160;
        break;
      case "company":
        d.color = orange;
        d.side = 80;
        break;
      case "parent company":
        d.color = pink;
        d.side = 40; 
        break;
      } 
    })
    .attr("width", d => d.side)
    .attr("height", d => d.side)
    .style("fill", d => d.color)
    .on("click", (d) => { 
      select("#explorer-sidebar")
        .html(`<h2>${d.name}`);
    })
    .on("mousedown", () => event.stopPropagation )        
    .call(drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));  

  node.append("title")
    .text( d => d.name );

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

    node
      .attr("x", d => d.x )
      .attr("y", d => d.y );      
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

  function zoomed()
  {
    var topG = select("#topG");
    topG.attr("transform", `translate(${+event.transform.x},${+event.transform.y}) scale(${event.transform.k})`);
  }

}

