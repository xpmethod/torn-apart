import $ from "jquery";
import L from "leaflet";
import _ from "lodash";
import { select } from "d3-selection";
import { slug } from "../utils";
import treeSidebarEntry from "./tree-sidebar-entry";
import treeSidebarPlayButtons from "./tree-sidebar-play-buttons";
import treeSelectCell from "./tree-select-cell";

export default function(data) {
  // draw buttons
  treeSidebarPlayButtons();

  // treeSidebarContent
  select("#tree-sidebar")
    .append("div")
    .attr("id", "tree-sidebar-carousel")
    .attr("class", "mt-3 carousel slide")
    .attr("data-ride", "carousel")
    .append("div")
    .classed("carousel-inner", true)
    .selectAll("div")
    .data(
      _.shuffle(data.nodes.filter(node => node.category === "parent company"))
    )
    .enter()
    .append("div")
    .attr("id", d => `treemap-card-${slug(d.id)}`)
    .classed("carousel-item", true)
    .html(treeSidebarEntry);

  if (!L.Browser.mobile) {
    const firstCompany = $(
      "#tree-sidebar-carousel .carousel-inner .carousel-item:first"
    );
    firstCompany.addClass("active");
    treeSelectCell(firstCompany.attr("id").replace("treemap-card-", "parent-"));

    $(".carousel").on("slid.bs.carousel", () => {
      treeSelectCell(
        $(".carousel-item.active")
          .attr("id")
          .replace("treemap-card-", "parent-")
      );
    });
  } else {
    $("#tree-sidebar").prepend(
      "<h3 id='click-on-cube' data-i18n='ta-click-on-cube-to-see-company'></h3>"
    );
  }
}
