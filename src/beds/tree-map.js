import $ from "jquery";
import { nest } from "d3-collection";
import bedsMain from "./main";
import Data from "./aor.json";
// window.addEventListener('message', function(e) {
//     var opts = e.data.opts,
//         data = e.data.data;

//     return main(opts, data);
// });

export default function(){
  const div = "#beds-viz";
  bedsMain( {
    title: "Detention Cost 2019",
    margin: {top: 24, right: 0, bottom: 0, left: 0},
    rname: "TOP",
    format: ",d",
    width: $(div).width(),
    height: 500,
    div
  }, 
  { key: "Detention Cost", 
    values: nest().key(d => d.region).entries(Data)
  });
}
