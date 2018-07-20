import $ from "jquery";
import initMap from "./map-init";
import clinks from "./clinks";

const map = initMap("mapdiv");
$("#indexModal").modal("show");
$("#legend").click(function(){ $(this).hide(); });
clinks(map);

