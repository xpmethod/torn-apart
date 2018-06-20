/* global DCOs, detention, crossing */
// jQuery available as $
// Leaflet available as L
// Turf available as turf
// Markdown-it available as markdownit
// d3 available as d3

// Fire up markdown
const md = markdownit({html: true}).use(markdownitFootnote);

// Intialize the map as the variable "map"
// This also hides the + / - zoom controls.
const map = L.map("mapdiv", { 
  center: [0,0], 
  zoom: 5, 
  zoomSnap: 0.25, 
  zoomControl: false 
});
map.fitBounds([[24.396, -124.848974, 24.396308], [49.384, -66.885444]]);
const mapnik = L.tileLayer.provider("OpenStreetMap.Mapnik");
const esri = L.tileLayer.provider("Esri.WorldImagery");
const baseLayers = {
  "OSM Mapnik": mapnik,
  "ESRI World": esri
};
mapnik.addTo(map);
L.control.layers(baseLayers).addTo(map);

// Angrily show all the official ICE detention facilities they also map
// OfficialICEDCs["features"].forEach( dc => {
//   L.marker([dc["lat"], dc["lon"]])
//     .bindPopup(dc["popup"])
//     .addTo(map);
// });

// Fire up the d3/svg engine.
// These are only really messed with when calling reset();
const svg = d3.select(map.getPanes().overlayPane).append("svg"),
  g = svg.append("g").attr("class", "leaflet-zoom-hide"),
  transform = d3.geoTransform({point: projectPoint}),
  path = d3.geoPath().projection(transform);

d3.json("web-data/blacksites.json", (error, collection) => {
  if (error) throw error;
  const feature = g.selectAll("path")
    .data(collection.features)
    .enter().append("path");

  map.on("viewreset", reset);
  map.on("zoomend", reset);
  reset();

  function reset() {
    const mapTopLeft = map.getBounds().getNorthWest();
    const mapBotRight = map.getBounds().getSouthEast();
    const topLeft = LatLngToXY([mapTopLeft.lat, mapTopLeft.lng], map);
    const botRight = LatLngToXY([mapBotRight.lat, mapBotRight.lng], map);
    svg.attr("width", botRight[0] - topLeft[0])
      .attr("height", botRight[1] - topLeft[1])
      .style("left", topLeft[0] + "px")
      .style("top", topLeft[1] + "px");
    g.attr("transform", `translate(${-topLeft[0]},${-topLeft[1]})`);
    feature.attr("d", path);
  }

});

d3.csv("web-data/ice-facs_geocoded.csv", null, // data => {
  // return {
  //   nom: data.nom,
  //   latitude: +data.latitude,
  //   longitude: +data.longitude,
  //   type: data.type,
  //   lien: data.lien
  // };
//},
  list => {
  // iterate over the list object
    list.forEach(place => {
      let circleStyle;
      if (place["Type.Detailed"] === "JUVENILE"){
        circleStyle = {
          color: "#0000dd",
          fillColor: "#0000dd",
          opacity: 0.4,
          fillOpacity: 0.2
        };
      } else {
        circleStyle = {
          color: "#0000dd",
          fillColor: "#0000dd",
          fillOpacity: 0.1,
          opacity: 0.1,
          weight: 0,
          radius: 4
        };
      }
      if(!isNaN(place.lat)){
        const lat = +place.lat;
        const lng = +place.lon;
        L.circleMarker([lat, lng], circleStyle
        ).addTo(map);//.bindPopup(`<h3><a href="${place.lien}">${place.nom}</a></h3>`).addTo(map);
      }
      // Alternatively, we can use icons from font-awesome.
      // L.marker([place.latitude, place.longitude],
      //   { icon: L.divIcon(
      //     { html: `<i style="color: ${color}" class="fa fa-${icon}"></i>`, iconSize: [30, 30] }
      //   )}
      // ).bindTooltip(place.nom).addTo(map);
    });
  });
 
// Now add the other layers.
[[crossing, "#00dd00"], [detention, "#dd0000"]].forEach( geojson => {
  let popup;
  L.geoJSON(geojson[0], {
    pointToLayer(f, l) {
      if (geojson[0] === detention) {
        const latlng = `${l.lat}${l.lng}`;popup = `<div class="row"><div class="col-6"><h4>${f.properties["Name"]}</h4></div><div class="col-6"><img class="img-fluid" alt="${f.properties["Name"]} satellite photo" src="imgs/sat-${latlng}.png"></div></div>`;
      } else {
        popup = `<h4>${f.properties["Name"]}</h4>`;
      }
      return L.circleMarker(l, {fillColor: geojson[1], color: geojson[1]}).bindPopup(popup);
    }
  }).addTo(map);
});

//////// TEXTUAL CONTENT
// 
// Use jQuery & Markdown to manipulate the html elements.
$("#card-header-text").html("<strong>Frontera Crisis</strong>");

// on load…
fillCard("welcome");

$(".nav-tab").click(function(){
  $(".nav-tab").removeClass("active");
  $(this).addClass("active");
  fillCard($(this).data("file"));
});

function fillCard(mdFile, divId = "nav-tabs-body"){
  $.ajax({ url: `markdown-files/${mdFile}.md`,
    success(markdown) {
      $(`#${divId}`).html(md.render(markdown));
    }
  });
}

// d3 functions
function LatLngToXY(arr, map) {
  var latLng = map.latLngToLayerPoint(new L.LatLng(arr[0], arr[1]));
  return [latLng.x, latLng.y];
}

function projectPoint(x, y) {
  const point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}

