import L from "leaflet";
import { mobileBounds, lower48Bounds } from "./constants";
import { moveLegend } from "./utils";

export default function(map, bounds = lower48Bounds) {
  if (L.Browser.mobile) {
    // under all circumstances, render the mobile map thusly:
    map.fitBounds(mobileBounds);
  } else {
    map.flyToBounds(bounds);
  }
  moveLegend();
  return map;
}
