import $ from "jquery";
import _ from "lodash";
import { select } from "d3-selection";
import { slug } from "../utils";
import treeSidebarEntry from "./tree-sidebar-entry";
import treeSidebarPlayButtons from "./tree-sidebar-play-buttons";
import treeSelectCell from "./tree-select-cell";

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
    .attr("id", d => `treemap-card-${slug(d.id)}`)
    .classed("carousel-item", true)
    .html(treeSidebarEntry);

  const firstCompany = $("#tree-sidebar-carousel .carousel-inner .carousel-item:first");
  firstCompany.addClass("active");
  treeSelectCell(firstCompany.attr("id").replace("treemap-card-", "parent-"));

  $(".carousel").on("slid.bs.carousel", () => {
    treeSelectCell($(".carousel-item.active")
      .attr("id")
      .replace("treemap-card-", "parent-"));
  });
}
