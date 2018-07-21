import $ from "jquery";
import drawBubbles from "./galaxy/draw-bubbles";

export default function(){
  $("#v2-div").show();
  $("#galaxy-viz").show();
  drawBubbles();
}
