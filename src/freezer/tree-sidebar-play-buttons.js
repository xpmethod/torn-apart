import {
  pauseCarousel,
  playCarousel,
  nextCarousel,
  previousCarousel
} from "./carousel-functions";
import { select } from "d3-selection";

export default function() {
  const data = [
    {
      name: "Previous",
      f: previousCarousel,
      iconHTML: "<i class='fas fa-step-backward'></i>"
    },
    {
      name: "Play",
      f: playCarousel,
      iconHTML: "<i class='fas fa-play'></i>"
    },
    {
      name: "Pause",
      f: pauseCarousel,
      iconHTML: "<i class='fas fa-pause'></i>"
    },
    {
      name: "Next",
      f: nextCarousel,
      iconHTML: "<i class='fas fa-step-forward'></i>"
    }
  ];

  select("#tree-sidebar")
    .append("div")
    .classed("d-none", true)
    .classed("d-md-block", true)
    .append("div")
    .classed("d-flex", true)
    .classed("justify-content-center", true)
    .append("div")
    .classed("btn-group", true)
    .selectAll("button")
    .data(data)
    .enter()
    .append("button")
    .attr("id", d => `tree-${d.name.toLowerCase()}-button`)
    .attr(
      "class",
      d =>
        `carousel-button btn btn-secondary carousel-button-${d.name.toLowerCase()}`
    )
    .on("click", d => d.f())
    .html(d => d.iconHTML);
}
