//import _ from "lodash";
//import sideBarSpreadsheet from "./sidebar-spreadsheet";

//import { bigMoneyFormat } from "../utils";
//import sideBarSpreadsheet from "./sidebar-spreadsheet";

import { bigMoneyFormat } from "../utils";
import sideBarSpreadsheet from "./sidebar-spreadsheet";
export default function(d){

  const html = [`<h3 style="color:#fc8d62;">${d.name}</h3>`];
  html.push(`<h4 style="color:#fc8d62;"><span data-i18n="ta-value-to-date"></span>:
      $${bigMoneyFormat(d.total_value)}</h4>`);
  html.push(sideBarSpreadsheet(d));
  return html.join("\n");

}
//  const html = [`<p><h3 style="color:#fc8d62;">Product Category:</h3>
//  <h4 style="color:#fc8d62;">${d.name}</h4>`];
//  //html.push(sideBarSpreadsheet(d));
//  return html.join("\n");
//}

//export default function(d){

//const html = ["<table class='table table-hover table-sm'>"];
//html.push("<thead><tr class='thead-dark'>");
//  _.each(["ta-v2-category"], header => {
//let th = "<th>";
//if(d.color){
//  th = `<th style="background-color: ${d.color};">`;
//}
//html.push(`${th}<small data-i18n="${d.name}"></small></th>`);
//  });
//html.push("</thead><tbody>");


//  _.each(d, d => {
//  html.push("<tr>");
//    html.push(`<td><small>${d.name}`);
//    html.push("</tr><tr>");
//  });
//html.push("</tbody></table>");
//return html.join("\n");
//}
