import $ from "jquery";
import gainDisplay from "./gain/display";
import gainCarousel from "./gain/carousel";

export default function(){
  $("#v2-div").show();
  $("#gain-viz").show();
  gainDisplay();
  gainCarousel();
}


