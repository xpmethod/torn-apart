import $ from "jquery";
import { moveLegend, defaultRadius } from "../utils";
import { purple, orange } from "../constants";
import updateTexts from "../update-texts";

export default function() {
  const radius = defaultRadius();
  $("#legend").html(() => {
    return `<div class="row px-3 pt-2">
      <div class="col-sm-4">
        <div class="media">
          <svg  height="${radius * 5}" width="${radius * 5}">
            <circle r="${radius * 1.5}" 
              cx="${radius * 2.5}" cy="${radius * 2.5}" 
              fill="${purple}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div data-i18n="ta-v1-private-juvenile-detention-facilities" class="media-body">
            Private juvenile detention facilities
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="media">
          <svg height="${radius * 5}" width="${radius * 5}">
            <circle r="${radius * 2}" 
              cx="${radius * 2.5}" cy="${radius * 2.5}" 
              fill="${orange}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div data-i18n="ta-v1-ice-facilities-since-2014" class="media-body">
            ICE facilities in use since 2014
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="media">
          <svg height="${radius * 5}" width="${radius * 5}">
            <circle r="${radius}" 
              cx="${radius * 2.5}" cy="${radius * 2.5}" 
              fill="${orange}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div data-i18n="ta-v1-ice-facilities-not-in-use" class="media-body">
            ICE facilities not in use
          </div>
        </div>
      </div>
    </div>
    <p class="mx-3 mb-2" data-i18n="ta-v1-clinks-legend-supp-text"></p>`;
  });
  updateTexts();
  moveLegend();
  $("#legend").show();
}
