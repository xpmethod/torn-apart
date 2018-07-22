import $ from "jquery";
import { mapZoomEnable } from "./utils";

export default function(map){
  mapZoomEnable(map);
  $("#v2-div").show();
  $("#beds-viz").show();
}
