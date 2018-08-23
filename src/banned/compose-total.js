// import { format } from "d3-format";
import { muslimBanTotal } from "../constants";
import neighbor from "./neighbor";

export default function composeTotal(
  remainingStates,
  runningTotal = muslimBanTotal,
  steps = []
) {
  let state;
  if (steps.length === 0) {
    state = remainingStates[0];
    steps.push(state);
    composeTotal(remainingStates, runningTotal - state.population, steps);
  } else if (runningTotal > 0) {
    state = neighbor(steps, remainingStates);
    if (state !== "no more cands") {
      steps.push(state);
      const newTotal = runningTotal - state.population;
      composeTotal(remainingStates, newTotal, steps);
    }
  }
  return { runningTotal, steps };
}
