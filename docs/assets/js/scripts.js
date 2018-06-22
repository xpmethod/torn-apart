/* global DCOs, detention, crossing */
// jQuery available as $
// Leaflet available as L
// Turf available as turf
// Markdown-it available as markdownit
// d3 available as d3

var orange = "#fc8d62";
var purple = "#8da0cb";

// Fire up markdown
// const md = markdownit({html: true}).use(markdownitFootnote);

$( document ).ready(() => {

  update_texts();

  if($("#border-buffer").length){
    const map = initMap("border-buffer");
    $.getJSON("assets/data/7.5mi.geojson", geojson => {
      const bufferLayer = L.geoJSON(geojson, { 
        style() { return { color: orange, fillColor: orange, fillOpacity: 0.5 } ; }
      }).addTo(map);
      map.fitBounds(bufferLayer.getBounds());
    });
    $.getJSON("assets/data/points-of-entry.json", geojson => {
      L.geoJSON(geojson, {
        pointToLayer(f, l) { return L.circleMarker(l, { opacity: 0.0, fillOpacity: 0.0 }).bindTooltip(f.properties.Name); }
      }).addTo(map);
    });
  }
  
  if($("#mapdiv").length){
    // #mapdiv is only on index, so… show the modal.
    $("#indexModal").modal("show");
    const map = initMap("mapdiv");
    buildIndexMap(map);
  }

  // Fire up the d3/svg engine.
  // These are only really messed with when calling reset();
  // const svg = d3.select(map.getPanes().overlayPane).append("svg").attr("width", $( window ).width()).attr("height", $( window ).height()),
  //   g = svg.append("g").attr("class", "leaflet-zoom-hide");
  // const blackSites = [];

  /*
  d3.json("web-data/blacksites.json", (error, collection) => {
  if (error) throw error;
  // d3 is very clever w/ geojson (paths and transforms), but if we want
  // to simply take latlngs and make them into points we can 
  // subsequently build on, we have to get a bit craftier.
  const blackSites = [{}, {}, {}, {}];
  // collection.features.forEach(feature => {
  //   feature.LatLng = new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
  //   for(let i = 1; i <= feature.properties.count; i++) {
  //     blackSites.push({dco: feature.properties.dco, latLng: feature.LatLng});
  //   }
  // });
  // console.log(blackSites);
  const simulation = d3.forceSimulation(blackSites)
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter($(window).width / 2, $(window).height / 2))
    .on("tick", ticked);


  // function ticked() {
  //   var u = d3.select('svg')
  //     .selectAll('circle')
  //     .data(blackSites)

  //   u.enter()
  //     .append('circle')
  //     .attr('r', 5)
  //     .merge(u)
  //     .attr('cx', function(d) {
  //       return d.x
  //     })
  //     .attr('cy', function(d) {
  //       return d.y
  //     })

  //   u.exit().remove()
  // }
  
  // collection.features.forEach(feature => {
  //   console.log("now drawing for", feature.properties.dco);
  //   console.log("should be this many nodes:", feature.properties.count);
  //   feature.LatLng = new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
  //   const nodes = d3.range(feature.properties.count).map(() => { return {type: 1}; });
  //   const dots = g.selectAll("circle")
  //     .data(nodes)
  //     .enter().append("circle")
  //     .classed(feature.properties.dco, true)
  //     .attr("r", 5)
  //     .attr("fill", "#333");
  //   const simulation = d3.forceSimulation(nodes)
  //     .force("charge", d3.forceCollide().radius(10))
  //     .force("r", d3.forceRadial(20, map.latLngToLayerPoint(feature.LatLng).x, map.latLngToLayerPoint(feature.LatLng).y ))
  //     .on("tick", ticked);

  //   function ticked() {
  //     dots.attr("cx", d => d.x)
  //       .attr("cy", d => d.y);
  //   }
  // });
  // const features = g.selectAll("text")
  //   .data(collection.features)
  //   .enter().append("text")
  //   .attr("text-anchor", "middle")
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "18")
  //   .attr("fill", "#333")
  //   .attr("id", d => d.properties.dco)
  //   // .attr("opacity", 0.0)
  //   .classed("dco", true)
  //   .text(d => d.properties.dco);

  // const 
  //   console.log(nodes.length);
  //   console.log(feature.properties.dco);

  // });

  // map.on("viewreset", reset());
  // map.on("zoomend", reset);
  // reset();

  // function reset() {
  //   features.attr("transform", d => `translate(${map.latLngToLayerPoint(d.LatLng).x},${map.latLngToLayerPoint(d.LatLng).y})`);
  // }
  });
  */


  /*
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
    })//.addTo(map);
  });
  */

  $(".locale-button").click(function(e){
    e.preventDefault();
    $(".locale-button").removeClass("active");
    $( this ).addClass("active");
    $.i18n().locale = $(this).data("locale");
    update_texts();
  });

  $(".locale-toggle").click(function(e){
    e.preventDefault();
    const langs = ["EN", "ES"];
    const langCodes = ["en", "es"];
    let index = langs.indexOf($( this ).text());
    index === langs.length - 1 ? index = 0 : index = index + 1;
    $.i18n().locale = langCodes[index];
    $( this ).text(langs[index]);
    update_texts();
  });

    

    

}); // close document.ready()

function initMap(mapid){
  const map = L.map(mapid, { 
    center: [0,0], 
    zoom: 5, 
    zoomSnap: 0.25
  });
  map.fitBounds([[24.396, -124.848974], [49.384, -66.885444]]);
  L.tileLayer.provider("Esri.WorldImagery").addTo(map);
  if (L.Browser.mobile) {
    map.removeControl(map.zoomControl);
  }
  $(".leaflet-top").css("margin-top", `${$("#navs").height()}px`);
  return map;
}

function update_texts() {
  $("body").i18n();
}

function buildIndexMap(map) {
  d3.csv("assets/data/ice-facs_geocoded.csv", null, list => {
    // iterate over the list object
    list.forEach(place => {
      let juvenileText;
      if (place["Type.Detailed"] === "JUVENILE"){
        juvenileText = "<h5>Juvenile Facility</h5>";
      } else {
        juvenileText = "";
      }
      const popup = `<div class="row"><div class="col-8">
      <h4>${place["Name"]}</h4>
      ${juvenileText}
      ${place["City"]}, ${place["State"]}
      </div><div class="col-4">
      <img data-src="ice-${place["DETLOC"]}-${place.lat}${place.lon}.png" class="img-fluid" src="/torn-apart/assets/imgs/onepixel.png"></div></div>`;
      const circleStyle = {
        color: "#000",
        fillColor: orange,
        opacity: 0.8
      };
      if (place["Type.Detailed"] === "JUVENILE"){
        circleStyle.fillOpacity = 0.9;
        circleStyle.fillColor = purple;
        circleStyle.radius = 8;
        circleStyle.weight = 1;
      } else {
        circleStyle.fillOpacity = 0.8;
        circleStyle.weight = 1;
        circleStyle.radius = 4;
      }
      if(!isNaN(place.lat)){
        const lat = +place.lat;
        const lng = +place.lon;
        L.circleMarker([lat, lng], circleStyle).bindPopup(popup).addTo(map);
        //.bindPopup(`<h3><a href="${place.lien}">${place.nom}</a></h3>`).addTo(map);
      }
      // Alternatively, we can use icons from font-awesome.
      // L.marker([place.latitude, place.longitude],
      //   { icon: L.divIcon(
      //     { html: `<i style="color: ${color}" class="fa fa-${icon}"></i>`, iconSize: [30, 30] }
      //   )}
      // ).bindTooltip(place.nom).addTo(map);
    });
  });
}
   

