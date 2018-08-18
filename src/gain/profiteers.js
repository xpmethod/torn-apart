import { select } from "d3-selection";
import { green, orange, pink, lime, beige, tan, lavender } from "../constants";
// import gainBarsLegend from "./bars-legend";
import getDecoration from "../get-decoration";
import { bigMoneyFormat } from "../utils";
import Data from "../../data/gain/minority-data.json";

export default function(){
  const list = select("#gain-profiteers-list");
  const language = {
    "black": "Black American–owned",
    "hispanic": "Hispanic American–owned",
    "saaia": "Subcontinent Asian American–owned",
    "asianPacific": "Asian Pacific American–owned",
    "native": "Native American–owned",
    "otherMinority": "Other Minority–owned",
    "female": "Women-owned"
  };
  const colors = [green, orange, pink, lime, beige, tan, lavender];

  list.selectAll("div")
    .data(Data.minorityCategories)
    .enter().append("div")
    .html((d,i) => {
      const profiteer = Data.biggestProfiteers[d];
      const company = getDecoration(profiteer.duns);
      let displayName = company.url ? `<a href="${company.url}">${company.cleanName}</a>` : company.cleanName;
      return `<h4 style="color: ${colors[i]};">${language[d]}</h4>
      <h5>${displayName}, <strong>$${bigMoneyFormat(profiteer.value)}</strong></h5>`;
    });

}

