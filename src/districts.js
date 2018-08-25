import $ from "jquery";
import districtsDraw from "./districts/draw";
import { mapZoomEnable } from "./utils";
import { lower48Bounds } from "./constants";
import spinner from "./spinner";

export default function(map) {
  mapZoomEnable(map);
  spinner.stop();
  districtsDraw(map);
  $("#d3-districts-svg").show();
  map.flyToBounds(lower48Bounds);
}
