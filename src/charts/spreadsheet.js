import $ from "jquery";
import { select } from "d3-selection";
import { format } from "d3-format";
import L from "leaflet";
import { orange } from "../constants";
import { defaultRadius } from "../utils";

export default function(mandays, map) {
  const radius = defaultRadius();
  const table = select("#mandays-table-div")
      .append("table")
      .classed("table", true)
      .classed("table-hover", true)
      .classed("table-sm", true),
    titles = ["name", "mandays", "pctDaysInUse"]; //d3.keys(mandays.data[0]);
  table
    .append("thead")
    .append("tr")
    .classed("thead-dark", true)
    .selectAll("th")
    .data(titles)
    .enter()
    .append("th")
    .attr("data-i18n", d => `ta-v1-${d}-header`);
  const rows = table
    .append("tbody")
    .selectAll("tr")
    .data(
      mandays.data
        .filter(d => d.mandays > 0)
        .sort((b, a) => a.mandays - b.mandays)
    )
    .enter()
    .append("tr");
  rows
    .selectAll("td")
    .data(d =>
      titles.map(k => {
        return { value: d[k], name: k };
      })
    )
    .enter()
    .append("td")
    .attr("data-th", d => d.name)
    .html(d => {
      if (d.name === "name") {
        return d.value;
      } else if (d.name === "mandays") {
        return format(",.0f")(d.value);
      } else {
        return `${Math.floor(d.value * 100)}%`;
      }
    });
  $(".map-icon").click(function(e) {
    e.preventDefault();
    const zoom = 12;
    const latLon = $(this)
      .data("latlng")
      .split(",");
    const pixelCoords = map.project(L.latLng(latLon), zoom);
    const newCenter = L.point(
      pixelCoords.x - 0.25 * $(window).width(),
      pixelCoords.y + 0.1 * $(window).width()
    );
    const newlatLng = map.unproject(newCenter, zoom);
    map.flyTo(newlatLng, zoom);
    select(`#${$(this).data("detloc")}-dot`)
      .transition()
      .delay(1000)
      .duration(6000)
      .attr("r", radius * 6)
      .style("fill", "red");
    select(`#${$(this).data("detloc")}-dot`)
      .transition()
      .delay(20000)
      .duration(5000)
      .attr("r", radius * 2)
      .style("fill", orange);
  });
}
