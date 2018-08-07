import _ from "lodash";
import { select, event } from "d3-selection";
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceX, forceY } from "d3-force";
import { drag } from "d3-drag";
import { zoom } from "d3-zoom";
import { green, purple, orange, pink } from "../constants";
import freezerMurderboardSidebar from "./murderboard-sidebar";
import Data from "../../data/freezer/graph.json";
import { scaleLog } from "d3-scale";
import { extent } from "d3-array";


export default function(){

  const graph = _.cloneDeep(Data);
  
  const lw = scaleLog() //sets a scale for line width
    .domain(extent(Data.links
      .filter(links => links.contract_value > 0)
      .map(links => links.contract_value))
    )
    .range([25, 100]);

  //zoom handler
  const theZoom = zoom()
    .scaleExtent([0.1, 0.3])
    .on("zoom", zoomed);

  const svg = select("#freezer-svg");
   
  const g = svg.append("g")
    .attr("id", "topG");
 
  const width = svg.attr("width");
  const height = svg.attr("height");

  window.onwheel = function(){return false;};

  const forces = {
    charge: -6000,
    x: 200,
    y: 200,
    alphaDecay: 0.01
  };
  const simulation = forceSimulation()
    .force("link", forceLink().id( d => d.id ))
    // changes spacing of viz via node repulsion
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
    .style("stroke-width", d => d.contract_value > 0 ? lw(d.contract_value) : 25);
    
  //could get d.source and then search nodes for the id that matches and get its corresponding color.
 


  var node = g.append("g")
    .selectAll("rect")
    .data(graph.nodes)
    .enter().append("rect")
    .classed("node", true)
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
        d.side = 160;
        break;
      }
    })
    .attr("width", d => d.side)
    .attr("height", d => d.side)
    .style("fill", d => d.color)
    .attr("transform", d => `translate(${-d.side / 2},${-d.side / 2})`)
    .on("click", freezerMurderboardSidebar)
    .on("mousedown", () => event.stopPropagation )
    .call(drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
   
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

 

  node.append("title")
    .text( d => d.id );
 
  theZoom(svg);
  theZoom.scaleTo(svg, 0.1);
 
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

  //zoom function
  function zoomed()
  {
    g.attr("transform", event.transform);
  }

}
