import $ from "jquery";
import { select } from "d3-selection";
import { resizeDivFromTop, fillV2DivHeight } from "./utils";
import addGlowFilter from "./add-glow-filter";
import updateTexts from "./update-texts";
import freezerTree from "./freezer/tree";
import freezerMurderboard from "./freezer/murderboard";

export default function(){
  $("#v2-div").show();
  $(document).ready(() => {
    resizeDivFromTop("#v2-div");
    $("#freezer-viz").show();
    const svg = select("#freezer-svg")
      .attr("width", $("#freezer-div").width())
      .attr("height", fillV2DivHeight("#freezer-headers"));
    addGlowFilter(svg);
    freezerMurderboard();
    freezerTree();
    $("#treemap-g").hide();
    updateTexts();
  });

  $("#treemap-button").click(() => {
    $("#treemap-button").addClass("active");
    $("#murderboard-button").removeClass("active");
    $("#treemap-g").show();
    $("#topG").hide();
    $("#tree-sidebar").show();
    $("#freezer-sidebar").hide();
  });
  $("#murderboard-button").click(() => {
    $("#murderboard-button").addClass("active");
    $("#treemap-button").removeClass("active");
    $("#topG").show();
    $("#treemap-g").hide();
    $("#tree-sidebar").hide();
    $("#freezer-sidebar").show();
  });


}
