import Mixin from "@ember/object/mixin";
import { schemeSet2 } from "d3-scale-chromatic";

export default Mixin.create({
  green: schemeSet2[0],
  orange: schemeSet2[1],
  purple: schemeSet2[2],
  pink: schemeSet2[3],
  lime: schemeSet2[4],
  beige: schemeSet2[5],
  tan: schemeSet2[6],
  lavender: schemeSet2[7],
  darkGreen: "#3a9276",
  lightGreen: "#b6e2d4"
});
