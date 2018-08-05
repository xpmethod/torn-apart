import $ from "jquery";
import { moveLegend, defaultRadius } from "../utils";
import { green } from "../constants";
import updateTexts from "../update-texts";

export default function(){
  const radius = defaultRadius();
  $("#legend").html(() => {
    return `<div class="row px-3 pt-2">
      <div class="col-sm-4">
        <div class="media">
          <svg  height="${radius * 5}" width="${radius * 5}">
            <circle r="${radius * 2}" 
              cx="${radius * 2.5}" cy="${radius * 2.5}" 
              fill="${green}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div data-i18n="ta-allies-legend-entry" class="media-body">
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <button class="allies-button btn btn-primary btn-block" id="allies-button"><span class="allies-button" data-i18n="ta-allies-button"></span> <i class="fas fa-list-ul"></i></button>
        <div data-i18n="ta-allies-supp-text"></div>
      </div>
    </div>`;
  });
  updateTexts();
  moveLegend();
  $("#legend").show();
}
