import Component from "@ember/component";
import { get } from "@ember/object";
import Minority from "../data/gain/minority";
import colors from "../mixins/colors";

export default Component.extend(colors, {
  init() {
    this._super();
    this.fills = [
      get(this, "green"),
      get(this, "orange"),
      get(this, "purple"),
      get(this, "pink"),
      get(this, "lime")
    ];
    this.data = Minority.minorityCategories
      .reverse()
      .splice(1)
      .reverse();
  }
});
