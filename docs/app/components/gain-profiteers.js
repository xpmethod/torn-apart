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
      get(this, "pink"),
      get(this, "lime"),
      get(this, "beige"),
      get(this, "tan")
    ];
    this.data = [].concat(Minority.minorityCategories);
  }
});
