import { bigMoneyFormat } from "../utils";
import sideBarSpreadsheet from "./sidebar-spreadsheet";

export default function(d){
  const html = [`<h3 style="color:${d.color};">${d.name}</h3>`];
  html.push(`<h4 style="color:${d.color};"><span data-i18n="ta-2018-awards-total-value"></span>:
      $${bigMoneyFormat(d.total_value)}</h4>`);
  html.push(sideBarSpreadsheet(d));
  return html.join("\n");

}
