import $ from "jquery";
import L from "leaflet";
import { select } from "d3-selection";
import { shuffle } from "d3-array";
import { geoPath, geoTransform } from "d3-geo";
import { featureCollection } from "@turf/helpers";
import { rem } from "./constants";
import lower48 from "./lower-48.geo.json";
import usPopulation from "./us-population.json";

export default function(map){
  $("#drawing-dialog").show();
  map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
  map.dragging.disable();
  $(map.getPanes().overlayPane).append("<svg id='d3-banned-svg'></svg>");
  const loop = 10000;
  const loopFactor = 0.1;
  $("#drawing-dialog").show();
  $("#banned-legend").click(function(){ $(this).hide(); }).css("margin-bottom", $(".leaflet-control-attribution").height() + rem);
  const banTotal = 208832081;
  $("#d3-banned-svg").show();
  setTimeout(() => {$("#banned-legend").show(loop * loopFactor);}, loop);
  return loopBanned(banTotal, loop, loopFactor, map);
}
 
function loopBanned(banTotal, loop, loopFactor, map){
  const fadeDuration = loop * loopFactor;
  select("#drawing-dialog").transition()
    .transition().delay(0).duration(loop + fadeDuration)
    .style("transform", "scale(0, 0)");
  return setTimeout(() => {
    const total = composeTotal(banTotal, usPopulation);
    const lastState = total.steps.pop();
    total.banTotal = total.banTotal - lastState.population;
    $("#banned-legend p em").html((i, html) => html.replace(/\S*%/, `${Math.floor(100 * total.banTotal / banTotal)}%`));
    const svg = select("#d3-banned-svg");
    svg.selectAll("g").remove();
    const g = svg.append("g").attr("class", "leaflet-zoom-hide");
    const collection = featureCollection(total.steps.map(state => lower48.features.filter( feature => feature.properties.code === `US-${state.code}`)[0]));

    const transform = geoTransform({ point: projectPoint }),
      path = geoPath().projection(transform);
    const feature = g.selectAll("path").data(collection.features)
      .enter().append("path").attr("opacity", 0).classed("banned-state", true).attr("stroke-width", 4);

    reset();
    
    function reset() {
      const bounds = path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];
      svg.attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");
      g.attr("transform", `translate(${-topLeft[0]},${-topLeft[1]})`);
      feature.attr("d", path)
        .transition()
        .delay(0).duration(fadeDuration)
        .style("opacity", 1);
      feature.transition()
        .delay(loop - fadeDuration).duration(fadeDuration)
        .style("opacity", 0);
    }
    loopBanned(banTotal, loop, loopFactor, map);
  }, loop);

  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }
}

function composeTotal(banTotal, data, steps = []){
  let state;
  if (steps.length === 0){
    state = shuffle(data).pop();
    steps.push(state);
    composeTotal(banTotal - state.population, data, steps);
  } else if (banTotal > 0) {
    state = neighbor(steps, data);
    if(state !== "no more cands"){
      steps.push(state);
      composeTotal(banTotal - state.population, data, steps);
    }
  }  
  return { banTotal, steps };
  // return { banTotal, states: steps.map(state => `US-${state.code}`) };
}


function neighbor(steps, data = []){
  for( let i = steps.length - 1; i >= 0; i--  ){
    const prevState = steps[i];
    if (prevState.neighbors.length > 0){
      let code = shuffle(prevState.neighbors).pop();
      let candState = data.filter( datum =>  datum.code === code)[0];
      if(candState){
        [data, steps].forEach(datum => {
          datum.forEach((step) => {
            step.neighbors = step.neighbors.filter(neighbor => neighbor !== candState.code);
          });
        });
        return candState;
      }
    }
  }
  return "no more cands";
}
