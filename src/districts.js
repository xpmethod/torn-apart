import $ from "jquery";
import districtsDraw from "./districts/draw";
import { mapZoomEnable } from "./utils";

export default function(map){
  mapZoomEnable(map);
  districtsDraw(map);
  $("#d3-districts-svg").show();
}

