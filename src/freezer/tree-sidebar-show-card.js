import $ from "jquery";
import { pauseCarousel } from "./carousel-functions";

export default function(d){
  $(".carousel-item").removeClass("active");
  $(`#treemap-card-${d.data.parentSlug}`).addClass("active");
  pauseCarousel();
  // console.log(this);
}
