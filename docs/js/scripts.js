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
L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);

// append an <svg> for d3 to play with.
const svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");


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
  L.geoJSON(geojson[0], {
    pointToLayer(f, l) {
      return L.circleMarker(l, {fillColor: geojson[1], color: geojson[1]});
    }
  }).addTo(map);
});

// Use jQuery & Markdown to manipulate the html elements.
$("#card-header-text").html("<strong>Frontera Crisis</strong>");

$.ajax({ url: "markdown-files/welcome.md",
  success(markdown) {
    $("#nav-tabs-body").html(md.render(markdown));
  }
});

$(".nav-tab").click(function(){
  $(".nav-tab").removeClass("active");
  $(this).addClass("active");
  $.ajax({ url: `markdown-files/${$(this).data("file")}.md`,
    success(markdown) {
      $("#nav-tabs-body").html(md.render(markdown));
    }
  });
});
