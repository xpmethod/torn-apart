import $ from "jquery";
import initMap from "./map-init";
import spinner from "./spinner";
import alliesLegend from "./allies/legend";
import alliesModal from "./allies/modal";
import alliesLayer from "./allies/layer";
import alliesD3 from "./allies/d3";

const map = initMap("allies-mapdiv");
map.fitBounds([[12.396, -124.848974], [49.384, -66.885444]]);
alliesLayer().addTo(map);
alliesModal();
alliesD3(map);
$("#d3-allies-svg").show();
alliesLegend();
spinner.stop();
$(".allies-button").click(() => $("#indexModal").modal("show"));
