import $ from "jquery";
import linesWedge from "./lines/wedge";
import linesLegend from "./lines/legend";
import { mapZoomEnable } from "./utils";
import spinner from "./spinner";

export default function(map) {
  if (!$("#spinner").length) {
    spinner.start();
  }
  mapZoomEnable(map);
  linesLegend();
  linesWedge(map);

  $("#d3-lines-svg").show();
  spinner.stop();
  // map.flyToBounds([[13.476, -170], [64.83, 150]]);
  map.on("click", () => {
    $(".tooltip").css("opacity", 0);
  });
}
