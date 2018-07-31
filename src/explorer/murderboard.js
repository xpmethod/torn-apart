import murderboard from "../../data/explorer/murderboard.json";
import { select, event } from "d3-selection";
import { forceSimulation, forceCenter, forceManyBody, forceLink} from "d3-force";
import { drag } from "d3-drag";
import { zoomTransform, zoom } from "d3-zoom";
import { green, purple, orange, pink, black } from "../constants";


export default function(){  
  var height = 768;
  var width = 1366;  

  var theZoom = zoom()
    .scaleExtent([.1, Infinity])
    .on("zoom", zoomed); 

  const svg = select("#explorer-svg")
    .attr("width", width)
    .attr("height", height)
    .call(theZoom)
    .append("g")
    .attr("id", "topG");  
  //sets unitial zoom level
  theZoom.scaleTo(select("svg"),-10);  

  window.onwheel = function(){return false;};  

  var simulation = forceSimulation()
    .force("link", forceLink().id(function(d) { return d.name; }))
    // changes spacing of viz via node repulsion
    .force("charge", forceManyBody().strength(-1999))
    .force("center", forceCenter(width / 2, height / 2));  

  var link = svg.append("g")
    .attr("class", "links")
    .call(zoomTransform)
    .selectAll("line")
    .data(murderboard.links)
    .enter().append("line")
  //change edge color based on property
    .style("stroke", function(d) { let color = pink;
      if(d.source === "product category") color = green;
      if(d.source === "product") color = purple;
      if(d.source === "company") color = orange; 
      return color; 
    });

  var node = svg.append("g")
    .attr("class", "nodes")
    .call(zoomTransform)
    .selectAll("rect")
    .data(murderboard.nodes)
    .enter().append("rect")
    .attr("width", function(d) {width = 0;
      //makes width of node a function of category
      if(d.category === "product category") width = 180;
      if(d.category === "product") width = 120;
      if(d.category === "company") width = 60;
      return width; 
    }) 
    .attr("height", function(d) {height = 0;
      //makes height of node a function of category
      if(d.category === "product category") height = 180;
      if(d.category === "product") height = 120;
      if(d.category === "company") height = 60;
      return height; 
    }) 
    .style("fill", function(d) { let color = black;
      if(d.category === "product category") color = green;
      if(d.category === "product") color = purple;
      if(d.category === "company") color = orange;
      return color;
    })
    .on("mousedown", function() { event.stopPropagation(); })        
    .call(drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));  

  node.append("title")
    .text(function(d) {return d.name;});

  simulation
    .nodes(murderboard.nodes)
    .on("tick", ticked);  

  simulation.force("link")
    .links(murderboard.links);  

 
  function ticked() {
    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });      

    node
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });      
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
    topG.attr("transform", "translate(" + event.transform.x+","+event.transform.y + ")scale(" + event.transform.k + ")");
  }

}