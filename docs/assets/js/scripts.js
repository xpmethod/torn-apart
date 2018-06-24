/* global s, blacksites, imgurImages, zeroIceFacs, iceFacs, detCtrs, bufferGeoJSON, pointsOfEntryGeoJSON */
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

  const locales = navigator.languages.filter( i => i.match(/(en|es)/) ).map( i => i.replace(/-.*/, ""));
  if (locales.length === 0){
    $.i18n().locale = "en";
  } else {
    $.i18n().locale = locales[0];
  }
  if ($.i18n().locale === "en") {
    $(".locale-toggle").html("ES");
  } else {
    $(".locale-toggle").html("EN");
  }
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
    $.i18n().locale = langCodes[index];
    $(`.${langCodes[index]}-button`).addClass("active");
    index === langs.length - 1 ? index = 0 : index = index + 1;
    $(`.${langCodes[index]}-button`).removeClass("active");
    $(".locale-toggle").text(langs[index]);
    update_texts();
    moveLegend();
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
  const vizHeight = $("#the-eye-div").height(); 
  const vizWidth = $("#the-eye-div").width(); 
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
    $(".eye-img").css("border-width", "3px");
    const pixelCoords = map.project(L.latLng($( this ).data("lat"), $( this ).data("lon")), 15);
    const imgfromOrigin = [$( this ).position().left + 64 - $( window ).width() / 2, 
      $( window ).height() / 2 - $( this ).position().top - 64];
    const newCenter = L.point(pixelCoords.x - imgfromOrigin[0], pixelCoords.y + imgfromOrigin[1]);
    const newlatlng = map.unproject(newCenter, 15);
    $( this ).removeClass("eye-tile-div").css("transform", "none");
    $(".eye-tile-div").removeClass("shadow").css("transform", "scale(0.25, 0.25)").css("transform-origin", "50% 50%").children("img").css("border-width", "12px");
    $( this ).addClass("eye-tile-div").addClass("shadow");
    map.flyTo(newlatlng, 15);
  });

}

function showViz(viz, map, layers){
  switch (viz) {
  case "the-trap":
    map.dragging.enable();
    map.flyToBounds([[34.1638, -97.1375], [25.8439, -118.608244]]);
    $("#charts-div").hide();
    $("#the-eye-div").hide();
    $(".leaflet-control-zoom").show();
    $("#orr-div").hide();
    $("#orr-legend").hide();
    $("#legend").hide();
    layers[0].addTo(map);
    map.removeLayer(layers[1]);
    update_texts();
    buildTrapLegend();
    break;
  case "the-eye":
    map.dragging.enable();
    $("#charts-div").hide();
    $(".leaflet-control-zoom").hide();
    $("#orr-div").hide();
    $("#orr-legend").hide();
    $("#legend").hide();
    map.removeLayer(layers[1]);
    map.removeLayer(layers[0]);
    buildTheEye();
    break;
  case "charts":
    map.dragging.enable();
    $("#legend").hide();
    $("#the-eye-div").hide();
    $("#orr-div").hide();
    $("#orr-legend").hide();
    $(".leaflet-control-zoom").hide();
    layers[1].addTo(map);
    map.removeLayer(layers[0]);
    map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
    buildCharts();
    $("#charts-div").show();
    break;
  case "clinks":
    map.dragging.enable();
    $("#charts-div").hide();
    $("#the-eye-div").hide();
    $("#orr-div").hide();
    $("#orr-legend").hide();
    $(".leaflet-control-zoom").show();
    $("#legend").hide();
    layers[1].addTo(map);
    map.removeLayer(layers[0]);
    map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
    update_texts();
    buildPointsLegend();
    break;
  case "orr":
    $("#legend").hide();
    $("#charts-div").hide();
    $("#the-eye-div").hide();
    $("#orr-div").show();
    $("#orr-legend").show();
    $(".leaflet-control-zoom").hide();
    map.removeLayer(layers[1]);
    map.removeLayer(layers[0]);
    map.flyToBounds([[24.396, -124.848974], [49.384, -66.885444]]);
    map.dragging.disable();
    buildORR();
    break;
  }
  update_texts();
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
          <span data-i18n="ta-trap-legend-1">The border is a trap. Begun in 2005,</span>
          <a href="https://en.wikipedia.org/wiki/Operation_Streamline">Operation Streamline</a>
          <span data-i18n="ta-trap-legend-2">has criminalized border crossing. Authorized ports of entry,
          tiny holes shown here as 15mi-wide</span> <a href="https://www.washingtonpost.com/world/national-security/at-the-us-border-asylum-seekers-fleeing-violence-are-told-to-come-back-later/2018/06/12/79a12718-6e4d-11e8-afd5-778aca903bbe_story.html?utm_term=.1caf2e540b8c" data-i18n="ta-trap-legend-3">turn back asylum seekers</a><span data-i18n="ta-trap-legend-4">, leading seekers into the</span>
          <a href="https://www.aclu.org/other/constitution-100-mile-border-zone" data-i18n="ta-trap-legend-5">100-mile-wide border zone</a>
          <span data-i18n="ta-trap-legend-6">where they are exposed to harsh conditions both from the environment and law enforcement.</span>
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
          <svg class="m-2" height="${defaultRadius * 5}" width="${defaultRadius * 5}">
            <circle r="${defaultRadius * 1.5}" 
              cx="${defaultRadius * 2.5}" cy="${defaultRadius * 2.5}" 
              fill="${purple}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div data-i18n="ta-private-juvenile-detention-facilities" class="media-body">
            Private juvenile detention facilities
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="media">
          <svg class="m-2" height="${defaultRadius * 5}" width="${defaultRadius * 5}">
            <circle r="${defaultRadius * 2}" 
              cx="${defaultRadius * 2.5}" cy="${defaultRadius * 2.5}" 
              fill="${orange}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div data-i18n="ta-ice-facilities-since-2014" class="media-body">
            ICE facilities in use since 2014
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="media">
          <svg class="m-2" height="${defaultRadius * 5}" width="${defaultRadius * 5}">
            <circle r="${defaultRadius}" 
              cx="${defaultRadius * 2.5}" cy="${defaultRadius * 2.5}" 
              fill="${orange}" fill-opacity="0.8"
              stroke="black" stroke-width="1" stroke-opacity="0.8" />
          </svg>
          <div data-i18n="ta-ice-facilities-not-in-use" class="media-body">
            ICE facilities not in use
          </div>
        </div>
      </div>
    </div>
    <div class="mx-3" data-i18n="ta-clinks-legend-supp-text">
      We are not showing the addresses of ICE facilities currently not in use. However, this is the full landscape of incarceration for those deemed without papers.
    </div>`;
  });
  moveLegend();
  $("#legend").show();
}

function buildCharts() {
  d3.csv("/torn-apart/assets/data/iceFacs.csv", (error, data) => {
    if (error) throw error;

    const margins = {top: 10, bottom: 30, left: 28, right: 2};
    const svgHeight = 200;
    const svgWidth = $("#time-series-text").width();

    // Init the charts.
    const tp = { data: [], margins, id: "#total-places-svg", ymax: 400, text: "Num. of facilities", showFY: true };
    const adp = { data: [], margins, id: "#adp-svg", ymax: 50000, text: "Avg. daily population", showFY: true };
    const bookins = { data: [], margins, id: "#bookins-svg", ymax: 1000000, text: "Bookins", showFY: true };
    const operators = { data: [], margins, id: "operators-svg" };
    const active = { data: [], margins, id: "active-svg" };
    const fy2017 = { data: [], margins, id: "fy2017-svg" };

    ["2014", "2015", "2016", "2017", "2018"].forEach(year => {
      const fy = year.replace("20", "FY");
      tp.data.push([fy, data.filter(d => +d[fy + ".ADP"] > 0).length]);
      adp.data.push([fy, d3.sum(data.map(d => +d[fy + ".ADP"]))]);
      if (year !== "2014"){
        bookins.data.push([fy, d3.sum(data.map(d => +d[fy + ".Facility.Bookins"]))]);
      }
    });

    [tp, adp, bookins].forEach(chart => initChart(chart, svgWidth, svgHeight));

    [tp, adp, bookins].forEach(chart => {
      chart.x = d3.scaleBand().rangeRound([0, chart.width]).padding(0.1);
      chart.y = d3.scaleLinear().rangeRound([chart.height, 0]);
      chart.x.domain(chart.data.map(d => d[0]));
      chart.y.domain([0, chart.ymax]);

      $(chart.id.replace("svg", "no")).html(chart.data[chart.data.length - 1][1]);

      chart.g.selectAll(".bar")
        .data(chart.data).enter().append("rect").attr("class", "bar")
        .attr("y", d => chart.y(d[1])).attr("x", d => chart.x(d[0]))
        .attr("height", d => chart.height - chart.y(d[1]))
        .attr("width", chart.x.bandwidth());
      chart.g.append("g").attr("transform", `translate(0,${chart.height})`)
        .call(d3.axisBottom(chart.x));
      chart.g.append("g").call(d3.axisLeft(chart.y).ticks(5).tickFormat(d3.format(".0f"))).append("text")
        .attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em")
        .attr("text-anchor", "end").text(chart.text); 

      if(chart.showFY){
        chart.svg.append("text").attr("transform", `translate(${svgWidth - chart.margins.right},${svgHeight - 2})`)
          .attr("text-anchor", "end").text("(fiscal year begins in previous October)"); 
      }
    });

    // const tpLine = d3.line().x(d => tpX(d[0])).y(d => tpY(d[1]));
    // const adpG = adpSvg.append("g").attr("transform", `translate(${margins.left + 15},${margins.top})`);
    // const bookinsG = bookinsSvg.append("g").attr("transform", `translate(${margins.left + 20},${margins.top})`);

    console.log(data[0]);

  });
}

function initChart(chart, svgWidth, svgHeight){
  chart.height = svgHeight - chart.margins.top - chart.margins.bottom;
  chart.width = svgWidth - chart.margins.left - chart.margins.right;
  chart.svg = d3.select(chart.id).attr("height", svgHeight);
  chart.g = chart.svg.append("g").attr("transform", `translate(${chart.margins.left},${chart.margins.top})`);
}

function prepareORRData() {
  return blacksites.features.map(site => {
    const adps = site.properties.adp.map(adp => { return {r: adp}; });
    return {
      dco: site.properties.dco,
      LatLng: new L.LatLng(site.geometry.coordinates[1], site.geometry.coordinates[0]),
      blacksites: adps
    };
  });
}

function buildORR(){
  $("#orr-legend").click(function(){ $(this).hide(); });
  const svg = d3.select("#orr-div").append("svg")
      .attr("width", $( window ).width())
      .attr("height",$( window ).height()),
    g = svg.append("g").classed("leaflet-zoom-hide", true).classed("chartLayer", true);

  const data = prepareORRData();

  data.forEach( datum => {
    const dg = g.append("g").attr("id", datum.dco).classed("nodes", true);
    const x = map.latLngToLayerPoint(datum.LatLng).x;
    const y = map.latLngToLayerPoint(datum.LatLng).y;
    const simulation = d3.forceSimulation()
      .force("collide", d3.forceCollide(d => d3.max([6, Math.pow(d.r, 0.62)])).iterations(16))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(x, y))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0));

    const node = dg.selectAll("circle")
      .data(datum.blacksites).enter().append("circle")
      .attr("r", d => d3.max([6, Math.pow(d.r, 0.6)]))
      .attr("stroke", "rgba(255,255,255,0.25)")
      .attr("stroke-width", 3)
      .on("tap", fleeMouse)
      .on("touch", fleeMouse)
      .on("mouseover", fleeMouse);

    const ticked = function() {
      node.attr("cx", d => d.x).attr("cy", d => d.y);
    };

    simulation
      .nodes(datum.blacksites)
      .on("tick", ticked);
  });
}

function fleeMouse(){
  d3.select(this).attr("transform", `translate(${d3.randomNormal(0, 25)()},${d3.randomNormal(0, 25)()})`); 
}



