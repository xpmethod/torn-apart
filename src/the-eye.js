import $ from "jquery";
import L from "leaflet";
import { shuffle } from "d3-array";
import { rem } from "./constants";
import imgurImages from "./imgur-images.json";
import iceFacs from "./ice-facilities.json";


export default function(map) {
  const vizHeight = $("#the-eye-div").height(); 
  const vizWidth = $("#the-eye-div").width(); 
  const columns = Math.floor( vizWidth / (128 + 6 + .5 * rem ));
  const rows = Math.floor( vizHeight / (128 + 6 + .5 * rem ));
  const images = shuffle(imgurImages).slice(0, columns * rows).map( image => {
    const detloc = Object.keys(image)[0];
    const currPlace = iceFacs.filter(fac => fac["DETLOC"] === detloc)[0];
    return {
      thumb: image[detloc].thumb,
      lat: currPlace.lat,
      lon: currPlace.lon
    };
  });
  let matrix = `<div style="width: ${vizWidth}px; height: ${vizHeight}px;" class="d-flex flex-column justify-content-around">`;
  for(let i = 1; i <= rows; i++){
    matrix = matrix + "<div class='d-flex justify-content-around'>";
    matrix = matrix + images.splice(0, columns).map(image => `<div class="eye-tile-div m-1" 
      data-lat="${image.lat}" data-lon="${image.lon}" >
      <img class="eye-img rounded" src="${image.thumb}"></div>`).join("");
    matrix = matrix + "</div>";
  }
  matrix = matrix + "</div>";
  $("#the-eye-div").html(matrix);
  $("#the-eye-div").show();
  $(".eye-tile-div").click(function(){
    $(".eye-img").css("border-width", "3px");
    const pixelCoords = map.project(L.latLng($( this ).data("lat"), $( this ).data("lon")), 15);
    const imgfromOrigin = [$( this ).position().left + 32 - $( window ).width() / 2, 
      $( window ).height() / 2 - $( this ).position().top - 128];
    const newCenter = L.point(pixelCoords.x - imgfromOrigin[0], pixelCoords.y + imgfromOrigin[1]);
    const newlatlng = map.unproject(newCenter, 15);
    $( this ).removeClass("eye-tile-div").css("transform", "none");
    $(".eye-tile-div").removeClass("shadow").css("transform", "scale(0.25, 0.25)").css("transform-origin", "50% 50%").children("img").css("border-width", "12px");
    $( this ).addClass("eye-tile-div").addClass("shadow");
    map.flyTo(newlatlng, 15);
  });
}


