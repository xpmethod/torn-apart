import $ from "jquery";
import initMap from "./map-init";
import clinks from "./clinks";
import spinner from "./spinner";

spinner.stop();
const map = initMap("mapdiv");
$("#indexModal").modal("show");
$("#legend").click(function() {
  $(this).hide();
});
clinks(map);
