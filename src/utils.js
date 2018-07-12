import $ from "jquery";
import L from "leaflet";
import s from "underscore.string";
// import { titleize } from "underscore";
// import _titleize from "underscore/titleize";
// import _swapCase from "underscore/swapCase";

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
  return s.titleize(s.swapCase(string));
}

