import { select } from "d3-selection";

export default function(d){
  select("#explorer-sidebar")
    .html(`<h2>${d.name}`);
}
