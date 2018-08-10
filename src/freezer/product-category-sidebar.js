import _ from "lodash";

export default function(d){
  const html = ["<table class='table table-hover table-sm'>"];
  html.push("<thead><tr class='thead-dark'>");
  _.each(["ta-v2-product-category"], header => {
    let th = "<th>";
    if(d.color){
      th = `<th style="background-color: ${d.color};">`;
    }
    html.push(`${th}<small data-i18n="${header}"></small></th>`);
  });
  html.push("</thead><tbody>");
  _.each(d, d => {
    html.push("<tr>");
    html.push(`<td><small>${d.id}`);
    html.push("</tr><tr>");
  });
  html.push("</tbody></table>");
  return html.join("\n");
}
