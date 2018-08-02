import $ from "jquery";
import drawBubbles from "./rain/draw-bubbles";

export default function(){
  $("#v2-div").show();
  $("#rain-viz").show();
  $("#rain-svg").click(() => $("#tooltip").css("opacity",0));
  drawBubbles();
}
