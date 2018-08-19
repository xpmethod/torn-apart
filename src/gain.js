import $ from "jquery";
import gainDisplay from "./gain/display";
import gainCarousel from "./gain/carousel";
import gainProfiteers from "./gain/profiteers";

export default function(){
  $("#v2-div").show();
  $("#gain-viz").show();
  gainDisplay();
  gainProfiteers();
  gainCarousel();
}


