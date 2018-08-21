import $ from "jquery";
import gainDisplay from "./gain/display";
import gainCarousel from "./gain/carousel";
import gainProfiteers from "./gain/profiteers";
import { resizeDivFromTop } from "./utils";
import spinner from "./spinner";

export default function(){
  if(!$("#spinner").length){
    spinner.start();
  }
  $(document).ready(() => {
    $("#v2-div").show();
    resizeDivFromTop("#v2-div");
    $("#gain-viz").show();
    gainDisplay();
    gainProfiteers();
    spinner.stop();
    gainCarousel();
  });
}


