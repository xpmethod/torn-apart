import L from "leaflet";
import { titleUp, defaultRadius } from "../utils";
import { purple, orange } from "../constants";
import circleMarker from "../circle-marker";
import sparkLine from "./spark-line";
import iceFacs from "./ice-facilities.json";
import imgurImages from "../the-eye/imgur-images.json";
import detCtrs from "./detention-centers.json";

export default function() {
  const radius = defaultRadius();
  const indexLayer = L.layerGroup();
  const iceFacsLayer = L.layerGroup();
  const detCtrsLayer = L.layerGroup();

  iceFacs.map(place => {
    const detloc = place["DETLOC"];
    const data = [
      [2014, +place["FY14.ADP"]],
      [2015, +place["FY15.ADP"]],
      [2016, +place["FY16.ADP"]],
      [2017, +place["FY17.ADP"]],
      [2018, +place["FY18.ADP"]]
    ];
    const svgData = sparkLine(data);
    let imgSrc = "/torn-apart/assets/imgs/onepixel.png";
    if (detloc !== "Redacted") {
      imgSrc = imgurImages.filter(img => img.hasOwnProperty(detloc))[0][detloc]
        .thumb;
    }
    const popup = `<div class="row">
      <div class="col-xs pl-3" style="height: 128; width: 128">
        <img height="128" width="128" class="popup-image" 
        src="${imgSrc}">
      </div>
      <div class="col-xs spark-div">
        <svg width="150" height="128">${svgData}</svg>
      </div>
    </div>
    <h5>${place["Name"]}</h5>
    ${titleUp(place["City"])}, ${place["State"]}
    `;
    if (!isNaN(place.lat)) {
      const circle = circleMarker(place, radius * 2, orange);
      iceFacsLayer.addLayer(circle.bindPopup(popup));
    }
  });
  detCtrs.forEach(place => {
    const popup = `<div class="media">
    <img height="150" width="150" class="popup-image mr-3" 
    src="${place.imgur}">
    <div class="media-body">
    <h5>${place["Name"]}</h5>
    <p><strong>${place["State"]}</strong></p>
    <!--<p>${place["Owner"]}</p>-->
    </div>
    `;
    if (!isNaN(place.lat)) {
      const circle = circleMarker(place, radius * 1.5, purple);
      detCtrsLayer.addLayer(circle.bindPopup(popup));
    }
  });
  indexLayer.addLayer(iceFacsLayer).addLayer(detCtrsLayer);
  return indexLayer;
}
