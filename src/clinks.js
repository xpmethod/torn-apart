import $ from "jquery";
import clinksLegend from "./clinks-legend";
import clinksLayer from "./clinks-layer";
import clinksD3 from "./clinks-d3";

export default function(map){
  const layer = clinksLayer(map);
  layer.addTo(map);
  clinksD3(map);
  $("#d3-dots-svg").show();
  map.dragging.enable();
  $(".leaflet-control-zoom").show();
  map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
  clinksLegend();
}

