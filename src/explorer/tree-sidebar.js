import $ from "jquery";
import _ from "lodash";
import { select } from "d3-selection";
import treeSidebarEntry from "./tree-sidebar-entry";
import treeSidebarPlayButtons from "./tree-sidebar-play-buttons";

export default function (data){

  // draw buttons
  treeSidebarPlayButtons();

  // rotate timer

  // treeSidebarContent
  select("#tree-sidebar")
    .append("div")
    .attr("id", "tree-sidebar-carousel")
    .attr("class", "mt-3 carousel slide")
    .attr("data-ride", "carousel")
    .append("div")
    .classed("carousel-inner", true)
    .selectAll("div")
    .data(_.shuffle(data.nodes.filter( node => node.category === "parent company")))
    .enter().append("div")
    .classed("carousel-item", true)
    .html(treeSidebarEntry);

  $("#tree-sidebar-carousel .carousel-inner .carousel-item:first").addClass("active");
}
