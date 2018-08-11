import $ from "jquery";
import linesWedge from "./lines/wedge";
import linesLegend from "./lines/legend";
import { mapZoomEnable } from "./utils";

export default function(map){
  mapZoomEnable(map);
  linesLegend();
  linesWedge(map);

  $("#d3-lines-svg").show();
  // map.flyToBounds([[13.476, -170], [64.83, 150]]);
  map.on("click", () => {
    $(".tooltip").css("opacity", 0);
  });
}


