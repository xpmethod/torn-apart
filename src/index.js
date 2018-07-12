import $ from "jquery";
import initMap from "./map-init";
import showViz from "./show-viz";

const map = initMap("mapdiv");
$("#indexModal").modal("show");
$("#legend").click(function(){ $(this).hide(); });
showViz("clinks", map);

