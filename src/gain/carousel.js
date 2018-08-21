import { select } from "d3-selection";
import { bigMoneyFormat } from "../utils";
import Data from "./wordCloudData.csv";

export default function(){
  select("#gain-carousel-inner")
    .selectAll("div")
    .data(Data)
    .enter().append("div")
    .attr("class", "carousel-item")
    .append("p")
    .attr("class", "text-center main-gain")
    .html(d => `${d.name}, <strong>$${bigMoneyFormat(d.total_value)}</strong><br />
      <small>(${d.product})</small>`);
}
