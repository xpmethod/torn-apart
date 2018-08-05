import $ from "jquery";
import { moveLegend } from "../utils";
import updateTexts from "../update-texts";
import { purple } from "../constants";

export default function(){
  $("#legend").show().html(`<div class="px-3 py-2">
    <div class="d-flex justify-content-between">
      <div class="legend-svg-div">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" style="fill:purple" class="legend-polygon districts-polygon" opacity="0.4"/>
        </svg>
        $70–$99
      </div>
      <div class="">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" style="fill:purple" class="legend-polygon districts-polygon" opacity="0.5" />
        </svg>
        $100–$120
      </div>
      <div class="">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" style="fill:purple" class="legend-polygon districts-polygon" opacity="0.7" />
        </svg>
        $121–$139
      </div>
      <div class="">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" style="fill:purple" class="legend-polygon districts-polygon" opacity="0.9" />
        </svg>
        $140–$160
      </div>
      <div class="">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" style="fill:purple" class="legend-polygon districts-polygon" opacity="1" />
        </svg>
        $160–$180
      </div>
    </div>
    <span data-i18n="ta-v2-beds-legend" style="fill:purple" class="markdownify"></span>
    <div id="lines-slider"></div>
  </div>`);
  updateTexts();
  moveLegend();
  const divWidth = Math.floor($(".legend-svg-div").width());
  $(".legend-svg").attr("width", divWidth);
  $(".legend-polygon").attr("width", divWidth);
}
