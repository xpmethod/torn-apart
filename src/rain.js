import $ from "jquery";
import drawBubbles from "./rain/draw-bubbles";

export default function(){
  $("#v2-div").show();
  $("#rain-viz").show();
  drawBubbles();
}
