import _ from "lodash";
import { select, selectAll } from "d3-selection";
import { handleMouseOver, handleMouseOut } from "../tooltip";
import districtsTooltip from "./tooltip";
import congressionalDistricts from "../../data/districts/fat_districts.geo.json";

export default function(opacity){
  const top15 = _(congressionalDistricts.features)
    .map(district => {
      return { 
        dom_id: district.properties.dom_id,
        value: district.properties.total_value
      };
    })
    .sortBy(["value"])
    .value()
    .reverse()
    .splice(0, 17);
  let i= 0;
  setInterval(() => {
    selectAll(".drawn-district")
      .each(d => handleMouseOut(d))
      .attr("fill-opacity", d => opacity(d.properties.total_value))
      .attr("filter", null);
    i = i === top15.length ? 0 : i;
    const bb = select(`#${top15[i].dom_id}`).node().getBBox();
    select(`#${top15[i].dom_id}`)
      .each(function(d) {
        d.tooltip = districtsTooltip(d);
        handleMouseOver(d, [bb.x + 0.5 * bb.width, bb.y + 0.5 * bb.height]);
      })
      .attr("fill-opacity", 1)
      .attr("filter", "url(#filter-glow-districts)");
    i = i + 1;
  }, 10000);
}
