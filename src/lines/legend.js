import $ from "jquery";
import updateTexts from "../update-texts";
import linesSlider from "./slider";
import { moveLegend } from "../utils";

export default function(){
  $("#legend").html(`<div class="px-3 py-2">
    <span data-i18n="ta-v2-lines-legend" class="markdownify"></span>
    <div id="lines-slider"></div>
  </div>`);
  updateTexts();
  linesSlider();
  moveLegend();
  $("#legend").show();
  $("#lines-slider").click((e) => {
    e.stopPropagation();
    $(".tooltip").css("opacity", 0);
  });
}

