import _ from "lodash";
import { select, event } from "d3-selection";
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceX, forceY } from "d3-force";
import { drag } from "d3-drag";
import { zoomTransform, zoom } from "d3-zoom";
import { green, purple, orange, pink } from "../constants";
import freezerMurderboardSidebar from "./murderboard-sidebar";
import Data from "../../data/freezer/graph.json";


export default function(){

  const graph = _.cloneDeep(Data);
  const theZoom = zoom()
    .scaleExtent([.1, .3])
    .on("zoom", zoomed);

  const svg = select("#freezer-svg")
    .call(theZoom)
    .append("g")
    .attr("id", "topG");
  //sets initial zoom level
  theZoom.scaleTo(select("svg"),-10);
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

  const link = svg.append("g")
    .attr("class", "links")
    .call(zoomTransform)
    .selectAll("line")
    .data(graph.links)
    .enter().append("line");
    // the math below isn't right here for stroke-width but I don't think I'm doing
    // this right and I'm concerned about the 0 contract_values in the data
    // removing edges entirely because x*0 = 0. All I managed to do was make the background
    // grey.
    //.attr("style", function(d) { return ("stroke-width:" + (d.contract_value * .01));});

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

  node.append("title")
    .text( d => d.id );

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
