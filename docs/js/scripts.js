/* global detention, crossing */
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

// append an <svg> for d3 to play with.
// const svg = d3.select(map.getPanes().overlayPane).append("svg"),
//   g = svg.append("g").attr("class", "leaflet-zoom-hide");


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
    const juvFacs = ["ABRXSPA", "CAJUVMN", "CMPJVNY", "COWJVWA", "GFJUVND", "MEYTHCT", "NOJUVOR", "NVJDCVA", "SHAJUKS"];
    list.forEach(place => {
      let circleStyle;
      if (juvFacs.includes(place["DETLOC"])){
        circleStyle = {
          color: "#0000dd",
          fillColor: "#0000dd"
        };
      } else if (place["Type"] === "ORR") {
        circleStyle = {
          color: "#00dddd",
          fillColor: "#00dddd",
          fillOpacity: 0.2,
          opacity: 0.2,
          weight: 0
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
      // Alternatively, we can use icons from font-awesome.
      // L.marker([place.latitude, place.longitude],
      //   { icon: L.divIcon(
      //     { html: `<i style="color: ${color}" class="fa fa-${icon}"></i>`, iconSize: [30, 30] }
      //   )}
      // ).bindTooltip(place.nom).addTo(map);
      }
    });
  });
 
// Now add the other layers.
[[crossing, "#00dd00"], [detention, "#dd0000"]].forEach( geojson => {
  let popup;
  L.geoJSON(geojson[0], {
    pointToLayer(f, l) {
      if (geojson[0] === detention) {
        const latlng = `${l.lat}${l.lng}`;
        popup = `<div class="row"><div class="col-6"><h4>${f.properties["Name"]}</h4></div><div class="col-6"><img class="img-fluid" alt="${f.properties["Name"]} satellite photo" src="imgs/sat-${latlng}.png"></div></div>`;
      } else {
        popup = `<h4>${f.properties["Name"]}</h4><br>Name above`;
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

// function projectPoint(x, y) {
//   const point = map.latLngToLayerPoint(new L.LatLng(y, x));
//   this.stream.point(point.x, point.y);
// }
