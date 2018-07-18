import $ from "jquery";
import chartsDisplay from "./charts/display";
import { mapZoomEnable } from "./utils";

export default function(map){
  mapZoomEnable(map);
  $(".leaflet-control-zoom").hide();
  $("#d3-dots-svg").show();
  $("#zero-g").hide();
  map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
  $("#charts-div").show();
  chartsDisplay(map);
}
