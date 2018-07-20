import $ from "jquery";
import updateTexts from "./update-texts";
import banned from "./banned";
import charts from "./charts";
import clinks from "./clinks";
import districts from "./districts";
import denaturalizations from "./denaturalizations";
import lines from "./lines";
import orr from "./orr";
import theEye from "./the-eye";
import trap from "./trap";
import clearIntervals from "./clear-intervals";
import { mapZoomDisable } from "./utils";

export default function (viz, map){
  clearIntervals(); // kill all timed functions like banned viz.
  mapZoomDisable(map); // disable zoom by default.
  $(".viz-hide").hide(); // hide all the vizualizations.
  switch (viz) {
  case "the-trap":
    trap(map);
    updateTexts(); // i18n function to markdownify and insert translations.
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
  case "lines":
    lines(map);
    updateTexts();
    break;
  case "districts":
    districts(map);
    updateTexts();
    break;
  case "denaturalizations":
    denaturalizations(map);
    updateTexts();
    break;
  case "banned":
    banned(map);
    break;
  }
}

