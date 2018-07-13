import $ from "jquery";
import updateTexts from "./update-texts";
import clinks from "./clinks";
import charts from "./charts";
import trap from "./trap";
import theEye from "./the-eye";
import orr from "./orr";

export default function (viz, map){
  $(".viz-hide").hide();
  switch (viz) {
  case "the-trap":
    trap(map);
    break;
  case "the-eye":
    theEye(map);
    break;
  case "charts":
    charts(map);
    break;
  case "clinks":
    clinks(map);
    break;
  case "orr":
    orr(map);
    break;
    /*
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

