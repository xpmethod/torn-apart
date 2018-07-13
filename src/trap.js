import $ from "jquery";
import trapLegend from "./trap-legend";
import trapLayer from "./trap-layer";

export default function(map){
  const layer = trapLayer();
  layer.addTo(map);
  map.dragging.enable();
  map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
  $(".leaflet-control-zoom").show();
  map.flyToBounds([[34.1638, -97.1375], [25.8439, -118.608244]]);
  trapLegend();
}
