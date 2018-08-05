import $ from "jquery";
import initMap from "./map-init";
// import alliesLegend from "./allies/legend";
// import alliesModal from "./allies/modal";
import alliesLayer from "./allies/layer";
import alliesD3 from "./allies/d3";

const map = initMap("allies-mapdiv");
alliesLayer().addTo(map);
alliesD3(map);
$("#d3-allies-svg").show();
