import L from "leaflet";
import buffer from "./buffer.geo.json";
import pointsOfEntry from "./points-of-entry.geo.json";
import { orange } from "./constants";

export default function(){
  const layer = L.layerGroup();
  const bufferLayer = L.geoJSON(buffer, { 
    interactive: false,
    style() { return { color: orange, fillColor: orange, fillOpacity: 0.5 } ; }
  });
  const pointsOfEntryLayer = L.geoJSON(pointsOfEntry, {
    pointToLayer(f, l) { return L.circleMarker(l, { opacity: 0.0, fillOpacity: 0.0 }).bindTooltip(f.properties.Name); }
  });
  return layer.addLayer(bufferLayer).addLayer(pointsOfEntryLayer);
}

