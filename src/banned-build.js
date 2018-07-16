import bannedDraw from "./banned-draw";
import composeTotal from "./banned-compose-total";
import { muslimBanTotal } from "./constants";

export default function(map, scratchStates){
  const total = composeTotal(muslimBanTotal, scratchStates);
  const lastState = total.steps.pop();
  total.runningTotal = total.runningTotal - lastState.population;
  bannedDraw(map, total);
  $("#banned-legend p em").html(`${Math.floor(100 * total.runningTotal / muslimBanTotal)}%`);

}
