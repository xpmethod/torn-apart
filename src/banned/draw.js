import L from "leaflet";
import { select } from "d3-selection";
import { geoPath, geoTransform } from "d3-geo";
import { featureCollection } from "@turf/helpers";
import lower48 from "./lower-48.geo.json";

export default function(map, total, loop = 10000, loopFactor = 0.1) {
  const fadeDuration = loop * loopFactor;
  const svg = select("#d3-banned-svg").classed("viz-hide", true);
  svg.selectAll("g").remove();
  const g = svg.append("g").attr("class", "leaflet-zoom-hide");
  const collection = featureCollection(
    total.steps.map(
      state =>
        lower48.features.filter(
          feature => feature.properties.code === `US-${state.code}`
        )[0]
    )
  );
  const transform = geoTransform({ point: projectPoint }),
    path = geoPath().projection(transform);
  const feature = g
    .selectAll("path")
    .data(collection.features)
    .enter()
    .append("path")
    .attr("opacity", 0)
    .classed("banned-state", true)
    .attr("stroke-width", 4);
  const bounds = path.bounds(collection),
    topLeft = bounds[0],
    bottomRight = bounds[1];
  svg
    .attr("width", bottomRight[0] - topLeft[0])
    .attr("height", bottomRight[1] - topLeft[1])
    .style("left", topLeft[0] + "px")
    .style("top", topLeft[1] + "px");
  g.attr("transform", `translate(${-topLeft[0]},${-topLeft[1]})`);
  feature
    .attr("d", path)
    .transition()
    .delay(0)
    .duration(fadeDuration)
    .style("opacity", 1);
  feature
    .transition()
    .delay(loop - fadeDuration)
    .duration(fadeDuration)
    .style("opacity", 0);

  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }
}
