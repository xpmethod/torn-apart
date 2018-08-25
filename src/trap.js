import $ from "jquery";
import trapLegend from "./trap/legend";
import trapLayer from "./trap/layer";
import { mapZoomEnable } from "./utils";
import { southernBorderBounds } from "./constants";

export default function(map) {
  mapZoomEnable(map);
  map.flyToBounds(southernBorderBounds);
  $(map.getPanes().overlayPane).append("<svg id='d3-trap-svg'></svg>");
  const layer = trapLayer(map);
  layer.addTo(map);
  trapLegend();
}
