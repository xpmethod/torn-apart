import $ from "jquery";
import { select } from "d3-selection";
import { resizeDivFromTop, fillV2DivHeight } from "./utils";
import spinner from "./spinner";
import addGlowFilter from "./add-glow-filter";
import freezerTree from "./freezer/tree";
import freezerMurderboard from "./freezer/murderboard";

export default function() {
  if (!$("#spinner").length) {
    spinner.start();
  }
  $("#v2-div").show();
  resizeDivFromTop("#v2-div");
  $("#freezer-viz").show();
  const height = window.matchMedia("(max-width: 576px)").matches
    ? $(window).height() / 3
    : fillV2DivHeight("#freezer-headers");
  if (window.matchMedia("(min-width: 576px)").matches) {
    $("#freezer-icetray-sidebar").height(height);
  }
  const svg = select("#freezer-svg")
    .attr("width", $("#freezer-div").width())
    .attr("height", height);
  addGlowFilter(svg);
  if (!$("#topG").length) {
    freezerMurderboard();
  }
  if (!$("#treemap-g").length) {
    freezerTree();
  }
  spinner.stop();
  $("#murderboard-button").addClass("active");
  $("#treemap-button").removeClass("active");
  $("#topG").show();
  $("#tree-sidebar").hide();
  $("#treemap-g").hide();
  $("#freezer-sidebar").show();

  $("#treemap-button").click(() => {
    $("#treemap-button").addClass("active");
    $("#murderboard-button").removeClass("active");
    $("#treemap-g").show();
    // $("#treemap-g").css("opacity", 1);
    $("#topG").hide();
    $("#tree-sidebar").show();
    $("#freezer-sidebar").hide();
    $(".carousel-button-play").addClass("active");
  });
  $("#murderboard-button").click(() => {
    $("#murderboard-button").addClass("active");
    $("#treemap-button").removeClass("active");
    $("#topG").show();
    // $("#treemap-g").css("opacity", 0);
    $("#treemap-g").hide();
    $("#tree-sidebar").hide();
    $("#freezer-sidebar").show();
  });

  // $("#treemap-g").hide();
}
