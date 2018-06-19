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
const map = L.map("mapdiv", { zoomSnap: 0.25, zoomControl: false });

// Set a center point and zoom level for it:
const zoomLevel = 5;

// Now set the view of the map and add a tile layer:
map.setView([0,0], zoomLevel);
L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);
map.fitBounds([[24.396, -124.848974, 24.396308], [49.384, -66.885444]]);

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
      if(place.lat){
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
  L.geoJSON(geojson[0], {
    pointToLayer(f, l) {
      return L.circleMarker(l, {fillColor: geojson[1], color: geojson[1]});
    }
  }).addTo(map);
});

// Use jQuery & Markdown to manipulate the html elements.
$("#card-header-text").html("<strong>Frontera Crisis</strong>");
[["body", "outlet-card-body"]].forEach( data => {
  $.ajax({ url: `markdown-files/${data[0]}.md`,
    success(markdown) {
      $(`#${data[1]}`).html(md.render(markdown));
    }
  });
});
