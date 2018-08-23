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
      updateTexts();
      break;
    case "rain":
      rain(map);
      updateTexts();
      break;
    case "freezer":
      freezer(map);
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
  }
}
