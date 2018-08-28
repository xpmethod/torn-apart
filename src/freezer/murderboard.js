import _ from "lodash";
import { select, selectAll, event } from "d3-selection";
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceLink,
  forceX,
  forceY
} from "d3-force";
import { drag } from "d3-drag";
import { zoom } from "d3-zoom";
import { green, purple, orange, pink } from "../constants";
import freezerMurderboardSidebar from "./murderboard-sidebar";
import Data from "../../data/freezer/graph.json";
import PostIt from "./post-it";
import { slug } from "../utils";

export default function() {
  const graph = _.cloneDeep(Data);
  const icon = {
    draw: "image",
    shadow: false,
    postIt: PostIt(),
    scale: 1,
    note: 1,
    side: 120
  };
  const svg = select("#freezer-svg");
  const g = svg.append("g").attr("id", "topG");
  const width = svg.attr("width");
  const height = svg.attr("height");

  const theZoom = zoom()
    .scaleExtent([0.1, 3])
    .on("zoom", zoomed);

  window.onwheel = function() {
    return false;
  };

  const forces = {
    charge: -2000,
    x: 100,
    y: 100,
    alphaDecay: 0.09
  };
  const simulation = forceSimulation()
    .force(
      "link",
      forceLink()
        .id(d => d.id)
        .distance(1500)
        .strength(1)
    )
    .force("charge", forceManyBody().strength(forces.charge))
    .force("center", forceCenter(width / 8, height / 2))
    .force("x", forceX(forces.x))
    .force("y", forceY(forces.y))
    .alphaDecay(forces.alphaDecay);

  const link = g
    .append("g")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("class", d => {
      let klass = d.contract_value > 0 ? "link" : "dotted-link";
      return `${klass} link-${slug(d.source)} link-${slug(d.target)}`;
    })
    .attr("opacity", 0.9)
    .style("stroke-width", 3);

  const nodes = g
    .append("g")
    .selectAll("g")
    .data(graph.nodes)
    .enter()
    .append("g")
    .classed("node-g", true)
    .each(d => {
      d.dom_id = "node-" + slug(d.id);
      switch (d.category) {
        case "product category":
          d.color = orange;
          d.colorText = "orange";
          break;
        case "product":
          d.color = purple;
          d.colorText = "purple";
          break;
        case "company":
          d.color = pink;
          d.colorText = "pink";
          break;
        case "parent company":
          d.color = green;
          d.colorText = "green";
          break;
      }
    })
    .attr("id", d => d.dom_id)
    .attr("data-color", d => d.color)
    .on("click", freezerMurderboardSidebar)
    .on("mousedown", () => event.stopPropagation)
    .call(
      drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  nodes
    .append("g")
    .attr("transform", "translate(-57,-55)")
    .append(icon.draw)
    .attr("class", "png")
    .on("mouseover", function(d) {
      selectAll(`.${d.dom_id.replace(/node-/, "link-")}`).style(
        "stroke-width",
        50
      );
      select(this)
        .attr("transform", "translate(-57, -55)")
        .attr("height", icon.side * 2)
        .attr("width", icon.side * 2);
    })
    .on("mouseout", function() {
      select(this)
        .attr("transform", "translate(0,0)")
        .attr("height", icon.side)
        .attr("width", icon.side);
      link.style("stroke-width", 3);
    });

  const icons = nodes.selectAll(icon.draw);

  if (icon.draw === "rect") {
    icons
      .style("fill", d => d.color)
      .attr("height", icon.side)
      .attr("width", icon.side);
  } else if (icon.draw === "path") {
    if (icon.shadow === true) {
      icons
        .attr("opacity", 0.7)
        .style("fill", "#000000")
        .attr("filter", "url(#filter-shadow-blur-freezer)")
        .attr("d", icon.postIt[0])
        .select(function() {
          return this.parentNode;
        })
        .append("path")
        .style("fill", d => d.color)
        .attr("d", icon.postIt[1]);
    } else {
      icons.style("fill", d => d.color).attr("d", icon.postIt[1]);
    }
  } else {
    icons
      .attr(
        "xlink:href",
        d =>
          `http://localhost:4000/torn-apart/assets/imgs/postit-${
            d.colorText
          }.png`
      )
      .attr("height", icon.side)
      .attr("width", icon.side);
  }

  link.style("stroke", d => {
    return select(`#node-${slug(d.target)}`).attr("data-color");
  });
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

  nodes.append("title").text(d => d.name);

  theZoom(svg);

  if (window.matchMedia("(max-width: 576px)").matches) {
    theZoom.scaleTo(svg, 0.2);
  } else {
    theZoom.scaleTo(svg, 0.1);
  }

  simulation.nodes(graph.nodes).on("tick", ticked);

  simulation.force("link").links(graph.links);

  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

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

  function zoomed() {
    g.attr("transform", event.transform);
  }
}
