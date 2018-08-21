import $ from "jquery";
import alliesLegend from "./allies/legend";
import alliesModal from "./allies/modal";
import alliesLayer from "./allies/layer";
import alliesD3 from "./allies/d3";
import L from "leaflet";
import { moveLegend } from "./utils";

const map = L.map("allies-mapdiv", { 
  center: [0,0], 
  zoom: 5, 
  zoomSnap: 0.25
});
map.fitBounds([[12.396, -124.848974], [49.384, -66.885444]]);
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
}).addTo(map);
if (L.Browser.mobile) {
  map.removeControl(map.zoomControl);
} else {
  $(".leaflet-control-zoom").addClass("viz-hide");
}
moveLegend();
alliesLayer().addTo(map);
alliesModal();
alliesD3(map);
$("#d3-allies-svg").show();
alliesLegend();
$(".allies-button").click(() => $("#indexModal").modal("show"));
