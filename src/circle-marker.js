import { orange } from "./constants";
import L from "leaflet";

export default function(place, radius = 4, color = orange, interactive = true, opacity = 0){
  const circleStyle = {
    interactive, 
    weight: 1,
    radius: radius,
    color: "#000",
    fillColor: color,
    fillOpacity: opacity,
    opacity: opacity
  };
  const lat = +place.lat;
  const lng = +place.lon;
  return L.circleMarker([lat, lng], circleStyle);
}

