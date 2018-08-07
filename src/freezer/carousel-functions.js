import $ from "jquery";

export function pauseCarousel(){
  $(".carousel").carousel("pause");
  $(".carousel-button").removeClass("active");
  $(".carousel-button-pause").addClass("active");
}

export function playCarousel(){
  $(".carousel").carousel("cycle");
  $(".carousel-button").removeClass("active");
  $(".carousel-button-play").addClass("active");
}

export function nextCarousel(){
  $(".carousel").carousel("next");
  $(".carousel-button").removeClass("active");
  $(".carousel-button-pause").addClass("active");
}

export function previousCarousel(){
  $(".carousel").carousel("prev");
  $(".carousel-button").removeClass("active");
  $(".carousel-button-pause").addClass("active");
}
