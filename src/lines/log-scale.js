import { scaleLog } from "d3-scale";
import linesConstants from "./constants";

export default function() {
  return scaleLog()
    .rangeRound([0, linesConstants.rangeMax])
    .domain([0.1, linesConstants.yMax]); // the largest value.
}
