import $ from "jquery";
import _ from "lodash";
import slugOrig from "./slug";
import { rem } from "./constants";
import { format } from "d3-format";
import getOrdinalSuffixOrig from "./get-ordinal-suffix";
import titleUpOrig from "./title-up";

export function moveLegend() {
  let displacedHeight = $(window).height() - $("#legend").height() - 1.25 * rem;
  displacedHeight = window.matchMedia("(max-width: 576px)").matches
    ? displacedHeight
    : displacedHeight - $(".leaflet-control-attribution").height();
  $("#legend").css("top", displacedHeight);
}

export function defaultRadius() {
  if (window.matchMedia("(max-width: 576px)").matches) {
    return 4;
  } else {
    return $(window).width() / 250;
  }
}

export function titleUp(string) {
  return titleUpOrig(string);
}

export function resizeDivFromTop(div) {
  if (!window.matchMedia("(max-width: 576px)").matches) {
    const navHeight = () => {
      const height = $("#all-navs").height() + $("#all-navs").position().top;
      if (height === 0) {
        return $("nav.navbar").outerHeight();
      } else {
        return height;
      }
    };
    const targetTop = navHeight() + 0.75 * rem;
    if (targetTop !== $(div).position().top) {
      const diff = targetTop - $(div).position().top;
      $(div).css("top", targetTop + "px");
      $(div).css("max-height", `${$(div).height() - diff}px`);
      $(div).css("min-height", `${$(div).height() - diff}px`);
    }
  }
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

export function slug(string) {
  return slugOrig(string);
}

export function getOrdinalSuffix(n) {
  return getOrdinalSuffixOrig(n);
}

export function fillV2DivHeight(elementAbove) {
  if (window.matchMedia("(max-width: 576px)").matches) {
    return $(window).height() / 2;
  } else {
    return $("#v2-div").height() - $(elementAbove).height() - rem;
  }
}

export function bigMoneyFormat(number) {
  return format(".2s")(_.toInteger(number)).replace(/G/, "B");
}
