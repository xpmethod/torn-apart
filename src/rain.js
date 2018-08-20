import $ from "jquery";
import drawBubbles from "./rain/draw-bubbles";
import { resizeDivFromTop } from "./utils";

export default function(){
  $(document).ready(() => {
    $("#v2-div").show();
    resizeDivFromTop("#v2-div");
    $("#rain-viz").show();
    drawBubbles();
  });
}
