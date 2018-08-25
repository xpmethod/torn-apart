import $ from "jquery";
import districtsDraw from "./districts/draw";
import { mapZoomEnable } from "./utils";
import centerMap from "./center-map";
import spinner from "./spinner";

export default function(map) {
  mapZoomEnable(map);
  spinner.stop();
  districtsDraw(map);
  $("#d3-districts-svg").show();
  centerMap(map);
}
