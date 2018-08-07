import { select, selectAll } from "d3-selection";
import treeSidebarShowCard from "./tree-sidebar-show-card";

export default function(d){
  selectAll("rect")
    .attr("filter", null)
    .attr("fill", d => d.color)
    .classed("clicked", false);
  selectAll(`.${select(this).attr("class")}`)
    .attr("fill", d => d.highlightColor)
    .attr("filter", "url(#filter-glow-freezer)");
  treeSidebarShowCard(d);
}
