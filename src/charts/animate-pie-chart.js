import { select, selectAll } from "d3-selection";
import { orange } from "../constants";
import "d3-transition";

export default function(){
  // choose the slice that was clicked.
  const slice = select(this);
  selectAll(".clicked")
    .transition().delay(0).duration(250)
    .style("stroke-width", 0)
    .style("opacity", "0.7");
  if(slice.classed("ORR-slice")){
    selectAll(".highlighted-dot").classed("highlighted-dot", false)
      .transition().delay(0).duration(250)
      .style("fill", orange);
    selectAll(".clicked")
      .classed("clicked", false);
  } else {
    if (!slice.classed("clicked")){
      selectAll(`.${slice.attr("data-group")}-slice`).classed("clicked", true)
        .transition().delay(0).duration(250)
        .style("stroke-width", 5)
        .style("opacity", "1");
      selectAll(".highlighted-dot").classed("highlighted-dot", false)
        .transition().delay(0).duration(250)
        .style("fill", orange);
      const selector = `.ice-dot.${slice.attr("data-group")}`;
      selectAll(selector).classed("highlighted-dot", true)
        .moveToFront()
        .transition().delay(100).duration(500)
        .style("fill", "red");
    } else {
      slice.transition().delay(0).duration(250)
        .style("stroke-width", 0)
        .style("opacity", "0.7");
      selectAll(".highlighted-dot").classed("highlighted-dot", false)
        .transition().delay(0).duration(250)
        .style("fill", orange);
      selectAll(".clicked")
        .classed("clicked", false);
    }
  }
}
