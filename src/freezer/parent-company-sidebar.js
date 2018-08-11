import { bigMoneyFormat } from "../utils";
import sideBarSpreadsheet from "./sidebar-spreadsheet";

export default function(d){

  const html = [`<h3 style="color:#66c2a5;">${d.name}</h3>`];
  html.push(`<h4 style="color:#66c2a5;"><span data-i18n="ta-value-to-date"></span>
    $${bigMoneyFormat(d.total_value)}</h4>`);
  html.push(sideBarSpreadsheet(d));
  return html.join("\n");


}
