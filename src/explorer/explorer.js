import graph from "../../data/explorer/graph.json";
import { select } from "d3-selection";
import { forceSimulation, forceCenter, forceManyBody, forceLink} from "d3-force";
import d3 from "d3";
import { green, purple, orange, pink, black } from "../constants";


export default function(){  
  var height = 768;
  var width = 1366;  

  var zoom = d3.zoom()
    .scaleExtent([0.1, 8])
    .on("zoom", zoomed);  

  var svg = select("#explorer-viz"). append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom)
    .append("g")
    .attr("id", "topG");  

  zoom.scaleTo(select("svg"),0.35);  

  window.onwheel = function(){return false;};  

  var simulation = forceSimulation()
    .force("link", forceLink().id(function(d) { return d.name; }))
    // changes spacing of viz via node repulsion
    .force("charge", forceManyBody().strength(-1500))
    .force("center", forceCenter(width / 1, height / 1));  
 

  var link = svg.append("g")
    .attr("class", "links")
    .call(d3.zoomTransform)
    .selectAll("line")
    .data(graph.links)
    .enter().append("line");  

  var node = svg.append("g")
    .attr("class", "nodes")
    .call(d3.zoomTransform)
    .selectAll("rect")
    .data(graph.nodes)
    .enter().append("rect")
    .attr("width", function(d) {width = 30;
      //makes width of node a function of category
      if(d.category === "suboffice") width = 480;
      if(d.category === "product category") width = 180;
      if(d.category === "product") width = 120;
      if(d.category === "company") width = 60;
      return width; 
    }) 
    .attr("height", function(d) {height = 30;
      //makes height of node a function of category
      if(d.category === "suboffice") height = 480;
      if(d.category === "product category") height = 180;
      if(d.category === "product") height = 120;
      if(d.category === "company") height = 60;
      return height; 
    }); 

  var color = "" 
    .style("fill", function(d) {color = black;
      if(d.category === "suboffice") color = green;
      if(d.category === "product category") color = purple;
      if(d.category === "product") color = orange;
      if(d.category === "company") color = pink;
      return color;
    })
    .on("mousedown", function() { d3.event.stopPropagation(); })        .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));  

  node.append("title")
    .text(function(d) { return d.name; });  

  simulation
    .nodes(graph.nodes)
    .on("tick", ticked);  

  simulation.force("link")
    .links(graph.links);  

  //change speed of viz cooling for animated murderboard effect
  simulation.alpha (.8);
  simulation.alphaTarget(0);
  simulation.alphaDecay([0]);   

  var text = svg.append("g").attr("class", "labels").selectAll("g")
    .data(graph.nodes)
    .enter().append("g");  

  text.append("text")
    .attr("x", 14)
    .attr("y", ".31em")
    .style("font-family", "sans-serif")
    .style("font-size", "2em")
    .text(function(d) { return d.name; });  
  

  function ticked() {
    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });      node
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });      text
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  } 

  //adds sticky dragging  

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }  

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }  

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = d.x;
    d.fy = d.y;
  }  

  function zoomed()
  {
    var topG = select("#topG");
    topG.attr("transform", "translate(" + d3.event.transform.x+","+d3.event.transform.y + ")scale(" + d3.event.transform.k + ")");
  }
}