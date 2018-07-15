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
    break;
  case "the-eye":
    theEye(map);
    break;
  case "charts":
    charts(map);
    break;
  case "clinks":
    clinks(map);
    break;
  case "orr":
    orr(map);
    break;
  case "banned":
    banned(map);
    break;
  }
  updateTexts();
}

