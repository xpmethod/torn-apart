import $ from "jquery";
import gainBars from "./bars";
import { fillV2DivHeight } from "../utils";

export default function() {
  const height = fillV2DivHeight("#gain-headers");
  const width = $("#gain-svg-div").width();

  $("#gain-profiteers").height(height);

  gainBars(width, height);
}
