import $ from "jquery";
import L from "leaflet";
import _ from "lodash";

export function moveLegend() {
  $("#legend").css("top", ($(window).height() - $("#legend").height() - $(".leaflet-control-attribution").height() - 18));
}

export function defaultRadius() {
  if (L.Browser.mobile) {
    return  4;
  } else {
    return  $( window ).width() / 250;
  }
}

export function titleUp(string) {
  return _.words(string).map( word => _.capitalize(word)).join(" ");
}

export function mapZoomEnable(map) {
  map.dragging.enable();
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();
  map.boxZoom.enable();
  map.keyboard.enable();
  if (map.tap) map.tap.enable();
  $(map).css("cursor", "grab");  
  $(".leaflet-control-zoom").show();
}

export function mapZoomDisable(map) {
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
  if (map.tap) map.tap.disable();
  $(map).css("cursor", "default");  
}

