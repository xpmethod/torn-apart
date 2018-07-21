import $ from "jquery";
import linesBarChart from "./lines/bar-chart";
import linesLegend from "./lines/legend";
import { mapZoomEnable } from "./utils";

export default function(map){
  mapZoomEnable(map);
  linesLegend();
  linesBarChart(map);

  $("#d3-lines-svg").show();
  // map.flyToBounds([[13.476, -170], [64.83, 150]]);

}


