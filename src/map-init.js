import $ from "jquery";
import L from "leaflet";
import { mobileBounds, lower48Bounds } from "./constants";
import { moveLegend } from "./utils";

export default function(mapid) {
  const map = L.map(mapid, {
    center: [0, 0],
    zoom: 5,
    zoomSnap: 0.25
  });
  if (L.Browser.mobile) {
    map.fitBounds(mobileBounds);
    map.removeControl(map.zoomControl);
  } else {
    map.fitBounds(lower48Bounds);
    $(".leaflet-control-zoom").addClass("viz-hide");
  }
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  ).addTo(map);
  moveLegend();
  return map;
}
