import $ from "jquery";
import linesBarChart from "./lines/bar-chart";
import { mapZoomEnable } from "./utils";

export default function(map){
  mapZoomEnable(map);
  linesBarChart(map);
  $("#d3-lines-svg").show();
  // map.flyToBounds([[13.476, -170], [64.83, 150]]);
}


