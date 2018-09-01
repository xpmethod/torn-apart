import L from "leaflet";
import { select } from "d3-selection";
import { geoPath, geoTransform } from "d3-geo";
import buffer from "./buffer.geo.json";
import pointsOfEntry from "./points-of-entry.geo.json";

export default function(map) {
  const layer = L.layerGroup();
  const svg = select("#d3-trap-svg");
  const g = svg.append("g").attr("class", "leaflet-zoom-hide");
  const transform = geoTransform({ point: projectPoint }),
    path = geoPath().projection(transform);
  const feature = g
    .selectAll("path")
    .data(buffer.features)
    .enter()
    .append("path")
    .classed("viz-hide", true)
    .classed("orange-polygon", true);

  const pointsOfEntryLayer = L.geoJSON(pointsOfEntry, {
    pointToLayer(f, l) {
      return L.circleMarker(l, { opacity: 0.0, fillOpacity: 0.0 }).bindTooltip(
        f.properties.Name
      );
    }
  });

  reset();
  map.on("zoomend", reset);

  function reset() {
    const bounds = path.bounds(buffer),
      topLeft = bounds[0],
      bottomRight = bounds[1];
    svg
      .attr("width", bottomRight[0] - topLeft[0])
      .attr("height", bottomRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");
    g.attr("transform", `translate(${-topLeft[0]},${-topLeft[1]})`);
    feature.attr("d", path);
  }

  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

  return layer.addLayer(pointsOfEntryLayer);
}
