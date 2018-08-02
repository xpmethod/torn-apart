import $ from "jquery";
import bedsVoronoiDraw from "./beds/voronoi-draw";
import bedsLegend from "./beds/legend";
import { mapZoomEnable } from "./utils";
import { lower48Bounds } from "./constants";

export default function(map){
  mapZoomEnable(map);
  bedsVoronoiDraw(map);
  $("#d3-beds-svg").show();
  map.flyToBounds(lower48Bounds);
  bedsLegend();
}
