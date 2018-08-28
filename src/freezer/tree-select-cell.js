import { select, selectAll } from "d3-selection";
import treeSidebarShowCard from "./tree-sidebar-show-card";

export default function(d) {
  select("#click-on-cube").remove();
  select("#treemap-g")
    .selectAll("rect")
    .attr("filter", null)
    .attr("fill", d => d.color);
  if (typeof d === "string") {
    selectAll(`.${d}`)
      .attr("fill", d => d.highlightColor)
      .attr("filter", "url(#filter-glow-freezer)");
  } else {
    const parentClass = select(this)
      .attr("class")
      .match(/(parent-[^\s]*)/)[1];
    selectAll(`.${parentClass}`)
      .attr("fill", d => d.highlightColor)
      .attr("filter", "url(#filter-glow-freezer)");
    treeSidebarShowCard(d);
  }
}
