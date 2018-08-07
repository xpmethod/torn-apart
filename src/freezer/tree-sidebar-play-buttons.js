import _ from "lodash";
import { select } from "d3-selection";

export default function() {

  const data = [
    {
      name: "Previous",
      iconHTML: "<i class='fas fa-step-backward'></i>",
    },
    {
      name: "Play",
      iconHTML: "<i class='fas fa-play'></i>",
    },
    {
      name: "Pause",
      iconHTML: "<i class='fas fa-pause'></i>",
    },
    {
      name: "Next",
      iconHTML: "<i class='fas fa-step-forward'></i>",
    }
  ];

  select("#tree-sidebar")
    .append("div")
    .classed("d-flex", true)
    .classed("justify-content-center", true)
    .append("div")
    .classed("btn-group", true)
    .selectAll("button")
    .data(data)
    .enter().append("button")
    .attr("id", d => `tree-${_.toLower(d.name)}-button`)
    .attr("class", "btn btn-secondary")
    .html(d => d.iconHTML);
}
