import $ from "jquery";
import initMap from "./map-init";
import showViz from "./show-viz-v2";
import { resizeDivFromTop } from "./utils";

const map = initMap("visualizations-mapdiv");
const theViz = window.location.href.replace(/^.*#/, "");
let timer;

showViz(theViz, map);
// jQuery behaviors:
$("#legend").click(function(){ $(this).hide(); });
// highlight the proper visualization
$("[href='/torn-apart/volume/2/visualizations.html#" + theViz + "']").addClass("active");
$(".viz-button").click(function() {
  clearTimeout(timer);
  $(".viz-button").removeClass("active");
  $( this ).addClass("active");
  showViz($( this ).attr("href").replace(/^.*#/, ""), map);
});

$(document).ready(() => {
  resizeDivFromTop("#v2-div");
});
