//import { bigMoneyFormat } from "../utils";
//import sideBarSpreadsheet from "./sidebar-spreadsheet";

export default function(d){

  const html = [`<p><h3 style="color:#8da0cb;">Product:</h3>
  <h4 style="color:#8da0cb;">${d.name}</h4>`];
  //html.push(sideBarSpreadsheet(d));
  return html.join("\n");
}
