import { shuffle } from "d3-array";

export default function(steps, data = []) {
  for (let i = steps.length - 1; i >= 0; i--) {
    const prevState = steps[i];
    // console.log(`checking on ${prevState.name} with neighbs ${prevState.neighbors.join(", ")}`);
    if (prevState.neighbors.length > 0) {
      let code = shuffle(prevState.neighbors).pop();
      if (code === steps[0].code && prevState.neighbors.length > 1) {
        code = shuffle(prevState.neighbors).pop();
        // } else if(prevState.neighbors.length === 0){
        //   code = "NN";
      }
      let candState = data.filter(datum => datum.code === code)[0];
      if (candState) {
        [data, steps].forEach(datum => {
          datum.forEach(step => {
            step.neighbors = step.neighbors.filter(
              neighbor => neighbor !== candState.code
            );
          });
        });
        // console.log("picked and wiped out this guy from all neighbors:", candState.name);
        return candState;
      }
    }
  }
  return "no more cands";
}
