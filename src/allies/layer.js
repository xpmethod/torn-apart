import L from "leaflet";
import _ from "lodash";
import circleMarker from "../circle-marker";
import { defaultRadius } from "../utils";
import allyDirectoryEntry from "./directory-entry";
import Data from "./list.csv";

export default function(){
  const layer = L.layerGroup();
  _.each(Data, ally => {
    const popup = allyDirectoryEntry(ally);
    if(ally.lat) {
      const circle = circleMarker(ally, defaultRadius() * 2);
      layer.addLayer(circle.bindPopup(popup));
    }
  });
  return layer;
}
