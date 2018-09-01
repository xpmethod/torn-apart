import $ from "jquery";
import drawBubbles from "./rain/draw-bubbles";
// import rainMoveLegendTexts from "./rain/move-legend-texts";
import { resizeDivFromTop } from "./utils";
import spinner from "./spinner";

export default function() {
  if (!$("#spinner").length) {
    spinner.start();
  }
  // $(document).ready(() => {
  $("#v2-div").show();
  resizeDivFromTop("#v2-div");
  $("#rain-viz").show();
  if (!$("#rain-g").length) {
    drawBubbles();
  } else {
    spinner.stop();
  }
  // rainMoveLegendTexts();
  // });
}
