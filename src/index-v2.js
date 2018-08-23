import $ from "jquery";
import initMap from "./map-init";
import districts from "./districts";

const map = initMap("mapdiv");
$("#indexModal").modal("show");
$("#legend").click(function() {
  $(this).hide();
});
districts(map);
