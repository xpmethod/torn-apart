import $ from "jquery";
import chartsDisplay from "./charts-display";

export default function(map){
  $("#d3-dots-svg").show();
  map.dragging.enable();
  map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
  $("#charts-div").show();
  chartsDisplay(map);
}
