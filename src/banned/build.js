import $ from "jquery";
import bannedDraw from "./draw";
import composeTotal from "./compose-total";
import { muslimBanTotal } from "../constants";

export default function(map, scratchStates) {
  const total = composeTotal(scratchStates, muslimBanTotal);
  const lastState = total.steps.pop();
  total.runningTotal = total.runningTotal - lastState.population;
  bannedDraw(map, total);
  $("#banned-legend p em").html(
    `${Math.floor((100 * total.runningTotal) / muslimBanTotal)}%`
  );
}
