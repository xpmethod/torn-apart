import $ from "jquery";
import updateTexts from "./update-texts";
import clinks from "./clinks";
import charts from "./charts";
import trap from "./trap";
import theEye from "./the-eye";
import orr from "./orr";
import banned from "./banned";
import clearIntervals from "./clear-intervals";
import { mapZoomDisable } from "./utils";

export default function (viz, map){
  clearIntervals();
  mapZoomDisable(map);
  $(".viz-hide").hide();
  switch (viz) {
  case "the-trap":
    trap(map);
    updateTexts();
    break;
  case "the-eye":
    theEye(map);
    updateTexts();
    break;
  case "charts":
    if($("#d3-dots-svg").length < 1){
      clinks(map);
      $("#legend").hide();
    }
    charts(map);
    updateTexts();
    break;
  case "clinks":
    clinks(map);
    updateTexts();
    break;
  case "orr":
    orr(map);
    updateTexts();
    break;
  case "banned":
    banned(map);
    break;
  }
}

