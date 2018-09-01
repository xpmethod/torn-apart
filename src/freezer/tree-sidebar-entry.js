import $ from "jquery";
import sideBarSpreadsheet from "./sidebar-spreadsheet";
import { bigMoneyFormat } from "../utils";

export default function(d) {
  const html = [`<h3>${d.name}</h3>`];
  html.push(`<h4><span data-i18n="ta-2018-awards-total-value">${$.i18n(
    "ta-2018-awards-total-value"
  )}</span>:
    $${bigMoneyFormat(d.total_value)}</h4>`);
  html.push(sideBarSpreadsheet(d));
  return html.join("\n");
}
