//import _ from "lodash";
//import sideBarSpreadsheet from "./sidebar-spreadsheet";

export default function(d){

  const html = ["<table class='table table-hover table-sm'>"];
  html.push("<thead><tr class='thead-dark'>");
  //  _.each(["ta-v2-category"], header => {
  let th = "<th>";
  if(d.color){
    th = `<th style="background-color: ${d.color};">`;
  }
  html.push(`${th}<small data-i18n="${d.name}"></small></th>`);
  //  });
  html.push("</thead><tbody>");


  //  _.each(d, d => {
  //  html.push("<tr>");
  //    html.push(`<td><small>${d.name}`);
  //    html.push("</tr><tr>");
  //  });
  html.push("</tbody></table>");
  return html.join("\n");
}
