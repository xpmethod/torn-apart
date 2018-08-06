import $ from "jquery";
import explorerTree from "./explorer/tree";
import explorerMurderboard from "./explorer/murderboard";

export default function(){
  $("#v2-div").show();
  $(document).ready(() => {
    explorerTree();
    $("#explorer-viz").show();
    $("#treemap-g").hide();
    explorerMurderboard();
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
