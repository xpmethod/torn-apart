import $ from "jquery";
import clinksLegend from "./clinks/legend";
import clinksLayer from "./clinks/layer";
import clinksD3 from "./clinks/d3";
import { mapZoomEnable } from "./utils";
import { lower48Bounds } from "./constants";

export default function(map) {
  mapZoomEnable(map);
  const layer = clinksLayer(map);
  layer.addTo(map);
  clinksD3(map);
  $("#d3-dots-svg").show();
  map.flyToBounds(lower48Bounds);
  clinksLegend();
}
