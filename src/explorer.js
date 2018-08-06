import $ from "jquery";
import { fillV2DivHeight } from "./utils";
import explorerTree from "./explorer/tree";
import explorerMurderboard from "./explorer/murderboard";

export default function(){
  $("#v2-div").show();
  $(document).ready(() => {
    $("#explorer-viz").show();
    $("#explorer-svg")
      .attr("width", $("#explorer-div").width())
      .attr("height", fillV2DivHeight("#explorer-headers"));
    explorerMurderboard();
    explorerTree();
    $("#treemap-g").hide();
  });
  $("#treemap-button").click(() => {
    $("#treemap-button").addClass("active");
    $("#murderboard-button").removeClass("active");
    $("#treemap-g").show();
    $("#topG").hide();
  });
  $("#murderboard-button").click(() => {
    $("#murderboard-button").addClass("active");
    $("#treemap-button").removeClass("active");
    $("#topG").show();
    $("#treemap-g").hide();
  });


}
