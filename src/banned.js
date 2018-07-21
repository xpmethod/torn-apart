import { shuffle } from "d3-array";
import $ from "jquery";
import bannedBuild from "./banned/build";
import states from "./banned/us-population.json";
import { lower48Bounds, rem } from "./constants";


export default function(map){
  map.flyToBounds(lower48Bounds);
  $(map.getPanes().overlayPane).append("<svg id='d3-banned-svg'></svg>");
  const loop = 10000;
  $("#banned-legend").click(function(){ $(this).hide(); }).css("margin-bottom", $(".leaflet-control-attribution").height() + rem).show();
  bannedBuild(map, shuffle(JSON.parse(JSON.stringify(states))));
  $("#d3-banned-svg").show();
  setInterval(() => {
    bannedBuild(map, shuffle(JSON.parse(JSON.stringify(states))));
  }, loop);
}
