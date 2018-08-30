import $ from "jquery";
import updateTexts from "./update-texts";
import districts from "./districts";
import freezer from "./freezer";
import rain from "./rain";
import lines from "./lines";
import gain from "./gain";
import clearIntervals from "./clear-intervals";
import { mapZoomDisable } from "./utils";

export default function(viz, map) {
  $("#navbarList").collapse("hide");
  clearIntervals(); // kill all timed functions like banned viz.
  mapZoomDisable(map); // disable zoom by default.
  $(".viz-hide").hide(); // hide all the vizualizations.
  $("#tooltip").css("opacity", 0); // hide the tooltip.
  switch (viz) {
    case "gain":
      gain(map);
      updateTexts("#gain-header", "#gain-viz");
      break;
    case "rain":
      rain(map);
      updateTexts("#rain-h2", "#rain-viz");
      break;
    case "freezer":
      freezer(map);
      updateTexts("#freezer-h2", "#freezer-viz");
      break;
    case "lines":
      lines(map);
      updateTexts();
      break;
    case "districts":
      districts(map);
      updateTexts("#districts-i18n-test-p", "#legend");
      break;
  }
}
