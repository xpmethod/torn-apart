import $ from "jquery";
import { moveLegend } from "../utils";
// import { moveLegend, defaultRadius } from "../utils";
// import { purple } from "../constants";
import updateTexts from "../update-texts";

export default function(){
  $("#legend").html(`<div class="px-3 py-2">
    <span data-i18n="ta-v2-districts-legend" class="markdownify"></span>
    <div id="lines-slider"></div>
  </div>`);
  updateTexts();
  moveLegend();
  $("#legend").show();
}

