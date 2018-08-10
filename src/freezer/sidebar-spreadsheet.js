import _ from "lodash";
import { bigMoneyFormat } from "../utils";

export default function(d){
  const html = ["<div class='spreadsheet'><table class='table table-hover table-sm'>"];
  html.push("<thead><tr class='thead-dark'>");
  _.each(["ta-v2-dba", "ta-v2-location", "ta-v2-category", "ta-v2-product-service", "ta-v2-current-value", "ta-v2-potential-value"], header => {
    let th = "<th>";
    if(d.color){
      th = `<th style="background-color: ${d.color};">`;
    }
    html.push(`${th}<small data-i18n="${header}"></small></th>`);
  });
  html.push("</thead><tbody>");
  _.each(d.awards, award => {
    html.push("<tr>");
    html.push(`<td><small>${award.recipient_name}</small></td>`);
    html.push(`<td><small>${award.recipient_city}, ${award.recipient_state}</small></td>`);
    html.push(`<td><small>${award.naics_cat}</small></td>`);
    html.push(`<td><small>${award.naics_description}</small></td>`);
    html.push(`<td><small>$${bigMoneyFormat(award.current_total_value)}</small></td>`);
    html.push(`<td><small>$${bigMoneyFormat(award.potential_total_value)}</small></td>`);
    html.push("</tr><tr>");
    html.push("<td>&nbsp;</td>");
    html.push(`<td colspan="5" class="award-description"><small><span data-i18n="ta-description"></span>: ${award.award_description}</small></td>`);
    html.push("</tr>");
  });
  html.push("</tbody></table></div>");
  return html.join("\n");
}
