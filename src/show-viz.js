import $ from "jquery";
import updateTexts from "./update-texts";
import clinks from "./clinks";
import trap from "./trap";

export default function (viz, map){
  $(".viz-hide").hide();
  switch (viz) {
  case "the-trap":
    trap(map);
    break;
  /*
  case "the-eye":
    $("#d3-banned-svg").hide();
    $("#d3-dots-svg").hide();
    map.dragging.enable();
    map.removeLayer(layers[1]);
    map.removeLayer(layers[0]);
    buildTheEye();
    break;
  case "charts":
    $("#d3-banned-svg").hide();
    $("#d3-dots-svg").show();
    map.dragging.enable();
    layers[1].addTo(map);
    map.removeLayer(layers[0]);
    map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
    buildCharts();
    $("#charts-div").show();
    break;
   */
  case "clinks":
    clinks(map);
    break;
    /*
  case "orr":
    $("#d3-banned-svg").hide();
    $("#d3-dots-svg").hide();
    $("#orr-div").show();
    $("#orr-legend").show();
    map.removeLayer(layers[1]);
    map.removeLayer(layers[0]);
    map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
    map.dragging.disable();
    buildORR();
    break;
  case "banned":
    $("#drawing-dialog").show();
    $("#d3-dots-svg").hide();
    map.removeLayer(layers[1]);
    map.removeLayer(layers[0]);
    map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
    map.dragging.disable();
    $("#d3-banned-svg").show();
    buildBanned();
   */
  }
  updateTexts();
}

