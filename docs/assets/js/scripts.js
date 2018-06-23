/* global s, imgurImages, zeroIceFacs, iceFacs, detCtrs, bufferGeoJSON, pointsOfEntryGeoJSON */
// jQuery available as $
// Leaflet available as L
// Turf available as turf
// Markdown-it available as markdownit
// d3 available as d3

var map;
var defaultRadius;
if (L.Browser.mobile) {
  defaultRadius = 4;
} else {
  defaultRadius = $( window ).width() / 250;
}
var green = "#66c2a5";
var orange = "#fc8d62";
var purple = "#8da0cb";
var rem = parseInt($("html").css("font-size").replace("px", ""));
var externalLinkHTML = "<span>&nbsp;<i style='vertical-align: baseline; font-size: 60%;' class='fa fa-small fa-external-link-alt'></i></span>";

// Fire up markdown
var md = markdownit({html: true}).use(markdownitFootnote);

$( document ).ready(() => {
  $("a[href^='http']:not(a:has(img))").append($.parseHTML(externalLinkHTML));
  $("a[href^='http']").attr("target", "_blank");

  $("#legend").click(function(){ $(this).hide(); });

  update_texts();

  if($("#visualizations-mapdiv").length){
    map = initMap("visualizations-mapdiv");
    const theViz = window.location.href.replace(/^.*#/, "");
    $("[href='#" + theViz + "']").addClass("active");
    const bufferLayer = buildBufferLayer();
    const detentionCentersLayer = buildPointsLayer();
    showViz(theViz, map, [bufferLayer, detentionCentersLayer]);
    $(".viz-button").click(function() {
      $(".viz-button").removeClass("active");
      $( this ).addClass("active");
      showViz($( this ).attr("href").replace(/^.*#/, ""), map, [bufferLayer, detentionCentersLayer]);
    });

  }
  
  if($("#mapdiv").length){
    // #mapdiv is only on index, so… show the modal.
    $("#indexModal").modal("show");
    map = initMap("mapdiv");
    buildPointsLegend();
    const pointsLayer = buildPointsLayer();
    pointsLayer.addTo(map);
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
  map = L.map(mapid, { 
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
  moveLegend();
  return map;
}

function update_texts() {
  $("body").i18n();
}

function buildPointsLayer() {
  const indexLayer = L.layerGroup();
  const zeroIceFacsLayer = L.layerGroup();
  const iceFacsLayer = L.layerGroup();
  const detCtrsLayer = L.layerGroup();
  // iterate over the list object
  zeroIceFacs.forEach(place => {
    if(!isNaN(place.lat)){
      zeroIceFacsLayer.addLayer(buildCircle(place, defaultRadius, orange, false));
    }
  });
  iceFacs.forEach(place => {
    const detloc = place["DETLOC"];
    const radius = defaultRadius * 2;
    const data = [[2014, +place["FY14.ADP"]],[2015, +place["FY15.ADP"]],[2016, +place["FY16.ADP"]],[2017, +place["FY17.ADP"]],[2018, +place["FY18.ADP"]]];
    const svgData = buildSpark(data);
    let imgSrc = "/torn-apart/assets/imgs/onepixel.png";
    if (detloc !== "Redacted") {
      imgSrc = imgurImages.filter((img) => img.hasOwnProperty(detloc))[0][detloc].thumb;
    }
    const popup = `<div class="row">
      <div class="col-xs pl-3" style="height: 128; width: 128">
        <img height="128" width="128" class="popup-image" 
        src="${imgSrc}">
      </div>
      <div class="col-xs spark-div">
        <svg width="150" height="128">${svgData}</svg>
      </div>
    </div>
    <h5>${place["Name"]}</h5>
    ${titleize(place["City"])}, ${place["State"]}
    `;
    if(!isNaN(place.lat)){
      const circle = buildCircle(place, radius, orange);
      iceFacsLayer.addLayer(circle.bindPopup(popup));
    }
  });
  detCtrs.forEach(place => {
    const popup = `<div class="media">
    <img height="150" width="150" class="popup-image mr-3" 
    src="/torn-apart/assets/imgs/ice-${place["DETLOC"]}-${place.lat}${place.lon}.png">
    <div class="media-body">
    <h5>${place["Name"]}</h5>
    ${place["State"]}
    </div>
    `;
    if(!isNaN(place.lat)){
      const circle = buildCircle(place, defaultRadius * 1.5, purple);
      detCtrsLayer.addLayer(circle.bindPopup(popup));
    }
  });
  indexLayer.addLayer(zeroIceFacsLayer).addLayer(iceFacsLayer).addLayer(detCtrsLayer);
  return indexLayer;
}

function buildCircle(place, radius = 4, color = orange, interactive = true){
  const circleStyle = {
    interactive, 
    weight: 1,
    radius: radius,
    color: "#000",
    fillColor: color,
    fillOpacity: 0.8,
    opacity: 0.8
  };
  const lat = +place.lat;
  const lng = +place.lon;
  return L.circleMarker([lat, lng], circleStyle);
}

function buildBufferLayer(){
  const layer = L.layerGroup();
  const buffer = L.geoJSON(bufferGeoJSON, { 
    style() { return { color: orange, fillColor: orange, fillOpacity: 0.5 } ; }
  });
  const pointsOfEntry = L.geoJSON(pointsOfEntryGeoJSON, {
    pointToLayer(f, l) { return L.circleMarker(l, { opacity: 0.0, fillOpacity: 0.0 }).bindTooltip(f.properties.Name); }
  });
  return layer.addLayer(buffer).addLayer(pointsOfEntry);
}

function buildTheEye() {
  const vizHeight = $( window ).height() - $("#navs").height() - $(".leaflet-control-attribution").height() - rem; 
  const vizWidth = $( window ).width() - 2 * rem; 
  const columns = Math.floor( vizWidth / (128 + 6 + .5 * rem ));
  const rows = Math.floor( vizHeight / (128 + 6 + .5 * rem ));
  const images = d3.shuffle(imgurImages).slice(0, columns * rows).map( image => {
    const detloc = Object.keys(image)[0];
    const currPlace = iceFacs.filter(fac => fac["DETLOC"] === detloc)[0];
    return {
      thumb: image[detloc].thumb,
      lat: currPlace.lat,
      lon: currPlace.lon
    };
  });
  let matrix = `<div style="width: ${vizWidth}px; height: ${vizHeight}px;" class="d-flex flex-column justify-content-around">`;
  for(let i = 1; i <= rows; i++){
    matrix = matrix + "<div class='d-flex justify-content-around'>";
    matrix = matrix + images.splice(0, columns).map(image => `<div class="eye-tile-div m-1" 
      data-lat="${image.lat}" data-lon="${image.lon}" >
      <img class="eye-img rounded" src="${image.thumb}"></div>`).join("");
    matrix = matrix + "</div>";
  }
  matrix = matrix + "</div>";
  $("#the-eye-div").html(matrix);
  $("#the-eye-div").show();
  $(".eye-tile-div").click(function(){
    const pixelCoords = map.project(L.latLng($( this ).data("lat"), $( this ).data("lon")), 15);
    const imgfromOrigin = [$( this ).position().left + 64 - $( window ).width() / 2, 
      $( window ).height() / 2 - $( this ).position().top + 64];
    const newCenter = L.point(pixelCoords.x - imgfromOrigin[0], pixelCoords.y + imgfromOrigin[1]);
    const newlatlng = map.unproject(newCenter, 15);
    $( this ).removeClass("eye-tile-div").css("transform", "none");
    $(".eye-tile-div").removeClass("shadow").css("transform", "scale(0.25, 0.25)").css("transform-origin", "50% 50%");
    $( this ).addClass("eye-tile-div").addClass("shadow");
    map.flyTo(newlatlng, 15);
  });

}

function showViz(viz, map, layers){
  switch (viz) {
  case "the-trap":
    map.flyToBounds([[34.1638, -97.1375], [25.8439, -118.608244]]);
    $("#charts-div").hide();
    $("#the-eye-div").hide();
    $(".leaflet-control-zoom").show();
    $("#legend").hide();
    layers[0].addTo(map);
    map.removeLayer(layers[1]);
    buildTrapLegend();
    break;
  case "the-eye":
    $("#charts-div").hide();
    $(".leaflet-control-zoom").hide();
    $("#legend").hide();
    map.removeLayer(layers[1]);
    map.removeLayer(layers[0]);
    buildTheEye();
    break;
  case "charts":
    $("#legend").hide();
    $("#the-eye-div").hide();
    $(".leaflet-control-zoom").hide();
    layers[1].addTo(map);
    map.removeLayer(layers[0]);
    map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
    buildCharts();
    $("#charts-div").show();
    break;
  case "clinks":
    $("#charts-div").hide();
    $("#the-eye-div").hide();
    $(".leaflet-control-zoom").show();
    $("#legend").hide();
    layers[1].addTo(map);
    map.removeLayer(layers[0]);
    map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
    buildPointsLegend();
    break;
  case "orr":
    $("#legend").hide();
    $("#charts-div").hide();
    $("#the-eye-div").hide();
    $(".leaflet-control-zoom").show();
    break;
  }
}

function moveLegend() {
  $("#legend").css("top", ($(window).height() - $("#legend").height() - $(".leaflet-control-attribution").height() - 18));
}

function titleize(string) {
  return s.titleize(s.swapCase(string));
}

function buildSpark(data) {
  const max = d3.max(data.map(d => d[1]));
  const svg = d3.select("#hidden-svg").append("svg").attr("width", 150).attr("height", 128),
    width = +svg.attr("width") - 50,
    height = +svg.attr("height") - 30,
    g = svg.append("g").attr("transform", "translate(35,10)");
  const x = d3.scaleLinear()
    .rangeRound([0, width]);
  const y = d3.scaleLinear()
    .rangeRound([height, 0]);
  const line = d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });
  x.domain([2014, 2018]);
  y.domain([0, max]);

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", green)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickValues([2014, 2018]).tickFormat(d3.format(".0f")));

  g.append("g")
    .call(d3.axisLeft(y).ticks(d3.min([max, 5])).tickFormat(d3.format(".0f")))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Avg. Daily Pop."); 

  return svg.node().innerHTML;
}

function buildTrapLegend(){
  let legendText = `The border is a trap. Begun in 2005, 
  [Operation Streamline](https://en.wikipedia.org/wiki/Operation_Streamline) 
  has criminalized border crossing. 
  Authorized ports of entry, tiny holes shown here as 15mi wide 
  [turn back asylum seekers](https://www.washingtonpost.com/world/national-security/at-the-us-border-asylum-seekers-fleeing-violence-are-told-to-come-back-later/2018/06/12/79a12718-6e4d-11e8-afd5-778aca903bbe_story.html?utm_term=.1caf2e540b8c),
  leading seekers into the [100-mile wide border zone](https://www.aclu.org/other/constitution-100-mile-border-zone) 
  where they are exposed to harsh conditions both from the 
  environment and law enforcement.`;
  legendText = md.render(legendText).replace(/href/g, "onclick='event.stopPropagation();' target='_blank' href").replace(/<\/a>/g, `${externalLinkHTML}</a>`);
  
  $("#legend").html(() => {
    return `<div class="px-3 py-2">
        <svg class="float-left m-2" height="50" width="50">
          <rect width="50" height="50" 
          style="stroke-width:5;fill:${orange};stroke:${orange};fill-opacity:0.5;" />
        </svg>
          ${legendText}
    </div>`;
  });
  moveLegend();
  $("#legend").show();
}

function buildPointsLegend(){
  $("#legend").html(() => {
    return `<div class="row px-3 pt-2">
      <div class="col-sm-4">
        <div class="media">
          <svg class="m-2" height="${defaultRadius * 4}" width="${defaultRadius * 4}">
            <circle r="${defaultRadius * 1.5}" 
              cx="${defaultRadius * 2}" cy="${defaultRadius * 2}" 
              fill="${purple}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div class="media-body">
            Private juvenile detention facilities
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="media">
          <svg class="m-2" height="${defaultRadius * 4}" width="${defaultRadius * 4}">
            <circle r="${defaultRadius * 2}" 
              cx="${defaultRadius * 2}" cy="${defaultRadius * 2}" 
              fill="${orange}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div class="media-body">
            ICE facilities in use since 2014
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="media">
          <svg class="m-2" height="${defaultRadius * 4}" width="${defaultRadius * 4}">
            <circle r="${defaultRadius}" 
              cx="${defaultRadius * 2}" cy="${defaultRadius * 2}" 
              fill="${orange}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div class="media-body">
            ICE facilities not in use
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3">
      This is some text for the legend.
    </div>`;
  });
  moveLegend();
  $("#legend").show();
}

function buildCharts() {
  $("#charts-div").css("height", $( window ).height() - $("#navs").height() - $(".leaflet-control-attribution").height() - $("#phone-navs").height() - rem).css("top", $("#phone-navs").height() + $("#navs").height() + .5 * rem);
  $("#charts-debugger").html(() => {
    return `phone-navs: ${$("#phone-navs").height()}
      navs: ${$("#navs").height()}
      attrib: ${$(".leaflet-control-attribution").height()}`;
  });
  d3.csv("/torn-apart/assets/data/iceFacs.csv", (error, data) => {
    if (error) throw error;

    const svgHeight = 200;
    const svgWidth = $("#time-series-div").width() / 2;
    const margins = {top: 10, bottom: 30, left: 28, right: 20};
    const height = svgHeight - margins.top - margins.bottom;
    const width = svgWidth - margins.left - margins.right;

    const tpSvg = d3.select("#total-places-svg").attr("width", svgWidth).attr("height", svgHeight);
    const tpG = tpSvg.append("g").attr("transform", `translate(${margins.left},${margins.top})`);
    const tpX = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const tpY = d3.scaleLinear().rangeRound([height, 0]);
    // const tpLine = d3.line().x(d => tpX(d[0])).y(d => tpY(d[1]));
    const adpSvg = d3.select("#adp-svg").attr("width", svgWidth).attr("height", svgHeight);
    const adpG = adpSvg.append("g").attr("transform", `translate(${margins.left + 15},${margins.top})`);
    const adpX = d3.scaleBand().rangeRound([0, width - 5]).padding(0.1);
    const adpY = d3.scaleLinear().rangeRound([height, 0]);
    const bookinsSvg = d3.select("#bookins-svg").attr("width", svgWidth).attr("height", svgHeight);
    const bookinsG = bookinsSvg.append("g").attr("transform", `translate(${margins.left + 20},${margins.top})`);
    const bookinsX = d3.scaleBand().rangeRound([0, width - 5]).padding(0.1);
    const bookinsY = d3.scaleLinear().rangeRound([height, 0]);

    console.log(data[0]);
    const totalPlaces = [];
    const adpByYear = [];
    const bookinsByYear = [];
    ["2014", "2015", "2016", "2017", "2018"].forEach(year => {
      const fy = year.replace("20", "FY");
      totalPlaces.push([fy, data.filter(d => +d[fy + ".ADP"] > 0).length]);
      adpByYear.push([fy, d3.sum(data.map(d => +d[fy + ".ADP"]))]);
      if (year !== "2014"){
        bookinsByYear.push([fy, d3.sum(data.map(d => +d[fy + ".Facility.Bookins"]))]);
      }
    });

    console.log(bookinsByYear);

    $("#total-places-no").html(totalPlaces[4][1]);
    // const tpMax = d3.max(totalPlaces.map(d => d[1]));
    tpX.domain(totalPlaces.map(d => d[0]));
    tpY.domain([0, 400]);
    // tpG.append("path").datum(totalPlaces).attr("fill", "none").attr("stroke", green).attr("stroke-linejoin", "round").attr("stroke-linecap", "round")
      // .attr("stroke-width", 1.5).attr("d", tpLine);
    tpG.selectAll(".bar")
      .data(totalPlaces).enter().append("rect").attr("class", "bar")
      .attr("y", d => tpY(d[1])).attr("x", d => tpX(d[0]))
      .attr("height", d => height - tpY(d[1]))
      .attr("width", tpX.bandwidth());
    tpG.append("g").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(tpX));
    tpG.append("g").call(d3.axisLeft(tpY).ticks(5).tickFormat(d3.format(".0f"))).append("text")
      .attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em")
      .attr("text-anchor", "end").text("Num. of Facilities"); 
    tpSvg.append("text").attr("transform", `translate(${svgWidth - margins.right},${svgHeight - 2})`)
      .attr("text-anchor", "end").text("(fiscal year begins in previous October)"); 

    $("#adp-no").html(adpByYear[4][1]);
    adpX.domain(adpByYear.map(d => d[0]));
    adpY.domain([0, 45000]);
    adpG.selectAll(".bar")
      .data(adpByYear).enter().append("rect").attr("class", "bar")
      .attr("y", d => adpY(d[1])).attr("x", d => adpX(d[0]))
      .attr("height", d => height - adpY(d[1]))
      .attr("width", adpX.bandwidth());
    adpG.append("g").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(adpX));
    adpG.append("g").call(d3.axisLeft(adpY).ticks(5).tickFormat(d3.format(",.0f"))).append("text")
      .attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em")
      .attr("text-anchor", "end").text("Avg. Daily Pop."); 
    adpSvg.append("text").attr("transform", `translate(${svgWidth - 3},${svgHeight - 2})`)
      .attr("text-anchor", "end").text("(fiscal year begins in previous October)"); 

    $("#bookins-no").html(bookinsByYear[3][1]);
    bookinsX.domain(bookinsByYear.map(d => d[0]));
    bookinsY.domain([0, 800000]);
    bookinsG.selectAll(".bar")
      .data(bookinsByYear).enter().append("rect").attr("class", "bar")
      .attr("y", d => bookinsY(d[1])).attr("x", d => bookinsX(d[0]))
      .attr("height", d => height - bookinsY(d[1]))
      .attr("width", bookinsX.bandwidth());
    bookinsG.append("g").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(bookinsX));
    bookinsG.append("g").call(d3.axisLeft(bookinsY).ticks(5).tickFormat(d3.format(",.0f"))).append("text")
      .attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em")
      .attr("text-anchor", "end").text("Bookins"); 
    bookinsSvg.append("text").attr("transform", `translate(${svgWidth - 3},${svgHeight - 2})`)
      .attr("text-anchor", "end").text("(fiscal year begins in previous October)"); 

    

  });
}

