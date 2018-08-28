import $ from "jquery";
import initMap from "./map-init";
import showViz from "./show-viz-v2";

const map = initMap("visualizations-mapdiv");
const theViz = window.location.href.replace(/^.*#/, "");
let timer;

showViz(theViz, map);
// jQuery behaviors:
$(".navbar-toggler").click(() => {
  $("#v2-div").hide();
  $("#tooltip").remove();
});
$("#legend").click(function() {
  $(this).hide();
});
// highlight the proper visualization
$("[href='/torn-apart/volume/2/visualizations.html#" + theViz + "']").addClass(
  "active"
);
$(".viz-button").click(function() {
  clearTimeout(timer);
  $(".viz-button").removeClass("active");
  $(this).addClass("active");
  showViz(
    $(this)
      .attr("href")
      .replace(/^.*#/, ""),
    map
  );
});
if (window.matchMedia("(max-width: 576px)").matches) {
  $("#indexModal").modal("show");
}
