import $ from "jquery";
import gainDisplay from "./gain/display";

export default function(){
  $("#v2-div").show();
  $("#gain-viz").show();
  gainDisplay();
}
