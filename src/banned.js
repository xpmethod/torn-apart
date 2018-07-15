import { shuffle } from "d3-array";
import $ from "jquery";
import bannedBuild from "./banned-build";
import updateTexts from "./update-texts";
import states from "./us-population.json";
import { rem } from "./constants";

export default function(map){
  map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
  $(map.getPanes().overlayPane).append("<svg id='d3-banned-svg'></svg>");
  const loop = 10000;
  $("#banned-legend").click(function(){ $(this).hide(); }).css("margin-bottom", $(".leaflet-control-attribution").height() + rem).show();
  bannedBuild(map, shuffle(JSON.parse(JSON.stringify(states))));
  $("#d3-banned-svg").show();
  setInterval(() => {
    bannedBuild(map, shuffle(JSON.parse(JSON.stringify(states))));
  }, loop);
}
