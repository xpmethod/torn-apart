import $ from "jquery";
import { rem } from "../constants";
import updateTexts from "../update-texts";
import linesSlider from "./slider";
import linesConstants from "./constants";
import linesDrawScale from "./draw-scale";
import { moveLegend } from "../utils";

export default function(){
  $("#legend").html(`<div class="px-3 py-2">
    <span data-i18n="ta-v2-lines-legend" class="markdownify"></span>
    <div id="lines-slider"></div>
    <div id="lines-scale"><svg id="lines-scale-svg" height="${linesConstants.barWidth + 20}" width="${$("#legend").width() - 2 * rem}" style="margin: 0px;"></svg></div>
  </div>`);
  linesDrawScale();
  updateTexts();
  linesSlider();
  moveLegend();
  $("#legend").show();
  $("#lines-slider").click((e) => {
    e.stopPropagation();
    $(".tooltip").css("opacity", 0);
  });
}

