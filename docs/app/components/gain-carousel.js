import Component from "@ember/component";
import Carousel from "../data/gain/carousel";

export default Component.extend({
  autoPlay: true,
  integerInterval: 3000,
  keyboard: true,
  ltr: true,
  pauseOnMouseEnter: true,
  showControls: false,
  showIndicators: false,
  init() {
    this._super();
    this.carousel = Carousel;
  }
});
