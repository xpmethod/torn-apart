import $ from "jquery";
import chartsDisplay from "./charts/display";
import { mapZoomEnable } from "./utils";
import { lower48Bounds } from "./constants";

export default function(map){
  mapZoomEnable(map);
  $(".leaflet-control-zoom").hide();
  $("#d3-dots-svg").show();
  $("#zero-g").hide();
  map.flyToBounds(lower48Bounds);
  $("#charts-div").show();
  chartsDisplay(map);
}
