import $ from "jquery";
import { moveLegend } from "../utils";
import updateTexts from "../update-texts";

export default function(){
  $("#legend").show().html(`<div class="px-3 py-2">
    <div class="d-flex justify-content-between">
      <div class="legend-svg-div">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" class="legend-polygon districts-polygon" opacity="0.4"/>
        </svg>
        $70–$99
      </div>
      <div class="">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" class="legend-polygon districts-polygon" opacity="0.6" />
        </svg>
        $100–$120
      </div>
      <div class="">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" class="legend-polygon districts-polygon" opacity="0.8" />
        </svg>
        $121–$139
      </div>
      <div class="">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" class="legend-polygon districts-polygon" opacity="1" />
        </svg>
        $140–$160
      </div>
      <div class="">
        <svg class="legend-svg" height="20" width="20">
          <rect height="20" width="20" class="legend-polygon districts-polygon" opacity="1.2" />
        </svg>
        $160–$180
      </div>
    </div>
    <span data-i18n="ta-v2-beds-legend" class="markdownify"></span>
    <div id="lines-slider"></div>
  </div>`);
  updateTexts();
  moveLegend();
  const divWidth = Math.floor($(".legend-svg-div").width());
  $(".legend-svg").attr("width", divWidth);
  $(".legend-polygon").attr("width", divWidth);
}
