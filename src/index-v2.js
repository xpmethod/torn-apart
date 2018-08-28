import $ from "jquery";
import initMap from "./map-init";
import districts from "./districts";

const map = initMap("mapdiv");
$("#indexModal").modal("show");
$(".navbar").click(() => {
  $("#v2-div").hide();
  $("#tooltip").remove();
});
$("#legend").click(function() {
  $(this).hide();
});
if (window.matchMedia("(max-width: 576px)").matches) {
  $("#iphone-se-alert").removeClass("d-none");
}
districts(map);
