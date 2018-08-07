import _ from "lodash";
import { select, event } from "d3-selection";
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceX, forceY } from "d3-force";
import { drag } from "d3-drag";
import { zoom } from "d3-zoom";
import { green, purple, orange, pink } from "../constants";
import freezerMurderboardSidebar from "./murderboard-sidebar";
import Data from "../../data/freezer/graph.json";
import { scalePow } from "d3-scale";


export default function(){

  var lw = scalePow() //sets a scale for line width
    .domain([100, 12147442]) //hardcoding the min and max contract values from freezer data
    .range([1, 10])
    .exponent(0.1);

  const graph = _.cloneDeep(Data);
  
  //zoom handler
  const theZoom = zoom()
    .scaleExtent([0.1, 0.3])
    .on("zoom", zoomed);

  const svg = select("#freezer-svg");
   
  const g = svg.append("g");
 
  const width = svg.attr("width");
  const height = svg.attr("height");

  window.onwheel = function(){return false;};

  const forces = {
    charge: -6000,
    x: 100,
    y: 100,
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
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
    .style("stroke-width", function(d) { return lw(d.contract_value)+1;}); //the +1 is because Roopsi didn't want the $0 contracts to have no link at all.
    
  //could get d.source and then search nodes for the id that matches and get its corresponding color.
 


  var node = g.append("g")
    .selectAll("rect")
    .attr("class", "nodes")
    .data(graph.nodes)
    .enter().append("rect")
    .each( d => {
      switch (d.category) {
      case "product category":
        d.color = green;
        d.side = 200;
        break;
      case "product":
        d.color = purple;
        d.side = 160;
        break;
      case "company":
        d.color = orange;
        d.side = 120;
        break;
      case "parent company":
        d.color = pink;
        d.side = 80;
        break;
      }
    })
    .attr("width", d => d.side)
    .attr("height", d => d.side)
    .style("fill", d => d.color)
    .on("click", freezerMurderboardSidebar)
    .on("mousedown", () => event.stopPropagation )
    .call(drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
   
  link.style("stroke", function(d) { 

    var color = "grey";

    for(var j = 0; j< graph.nodes.length; j = j+1){
      var targetName = d.target;
      if (graph.nodes[j].id === targetName)
      {
        color = graph.nodes[j].color;
      }
    }
 
    return color; 

  });

 

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
