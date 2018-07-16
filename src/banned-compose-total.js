// import { format } from "d3-format";
import { muslimBanTotal } from "./constants"; 
import neighbor from "./banned-neighbor";

export default function composeTotal(runningTotal = muslimBanTotal, remainingStates, steps = []){
  let state;
  if (steps.length === 0){
    state = remainingStates[0];
    steps.push(state);
    // remainingStates.map(remainingState => remainingState.neighbors = remainingState.neighbors.filter(neighbor => neighbor !== state.code)); 
    composeTotal(runningTotal - state.population, remainingStates, steps);
  } else if (runningTotal > 0) {
    state = neighbor(steps, remainingStates);
    if(state !== "no more cands"){
      steps.push(state);
      const newTotal = runningTotal - state.population;
      composeTotal(newTotal, remainingStates, steps);
    }
  } else {
    // console.log("no more cands"); 
  }
  return { runningTotal, steps };
}


