/* global s, blacksites, facOperators imgurImages, zeroIceFacs, iceFacs, detCtrs, bufferGeoJSON, pointsOfEntryGeoJSON */

// More globals
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
var md = markdownit({html: true}).use(markdownitFootnote);
// var md = new kramed.Renderer();

$( document ).ready(() => {
  initPages();
  initI18n();
  formatRedacted();  
  formatFootnotes();
});

function initPages(){
  if($("#mapdiv").length) initIndex();
  if($("#visualizations-mapdiv").length) initVisualizations();
  if($("#textures-full-text").length) initTextures();
}

function initIndex(){
  $("#indexModal").modal("show");
  map = initMap("mapdiv");
  $("#legend").click(function(){ $(this).hide(); });
  buildPointsLegend();
  const pointsLayer = buildPointsLayer();
  pointsLayer.addTo(map);
}

function initVisualizations(){
  $(".navbar-toggler").click(() => $("#charts-div").hide());
  map = initMap("visualizations-mapdiv");
  $("#legend").click(function(){ $(this).hide(); });
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

function initTextures(){
  const q = d3.queue();
  const textures = {};
  q.defer(callback => {
    $.ajax({ url: "assets/markdown/textures_en.md" })
      .done( data => { textures.en = data; callback(null); });
  });
  q.defer(callback => {
    $.ajax({ url: "assets/markdown/textures_es.md" })
      .done( data => { textures.es = data; callback(null); });
  });
  q.await(e => {
    if (e) throw e;
    // console.log(textures.en.slice(1140, 1150));
    $.i18n().load( { en: {"ta-textures-full-text": textures.en },
      es: {"ta-textures-full-text": textures.es } });
    update_texts();
  });
}

function initI18n(){
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
}

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

function update_texts(divArray = null) {
  divArray;
  const externalLinkHTML = "<span>&nbsp;<i style='vertical-align: baseline; font-size: 60%;' class='fa fa-small fa-external-link-alt'></i></span>";
  const q = d3.queue();
  q.defer(callback => {$("body").i18n(); callback(null);});
  q.await(function(e){
    if (e) throw e;
    $(".markdownify").html((i, html) => {
      return md.render(html);
    });
    $(".click-to-hide a").each(function() {
      $( this ).attr("onclick", "event.stopPropagation();");
    });
    $("a[href^='http']:not(a:has(img))").html(function(i, html){
      if(!html.match("fa-external-link-alt")){
        $( this ).append($.parseHTML(externalLinkHTML));
      }
    });
    $("a[href^='http']").attr("target", "_blank");
  });
}

function buildD3Points() {
  const svg = d3.select(map.getPanes().overlayPane).append("svg")
    .style("z-index", 210)
    .style("pointer-events", "none")
    .attr("width", $( window ).width())
    .attr("height", $( window ).height())
    .attr("id", "d3-leaflet-svg");
  const iceG = svg.append("g").attr("id", "ice-g").classed("leaflet-zoom-hide", true);
  const dcG = svg.append("g").attr("id", "dc-g").classed("leaflet-zoom-hide", true);
  iceG.selectAll("circle")
    .data(iceFacs.filter(d => d.lat !== "NA"))
    .enter().append("circle")
    .style("stroke", "black")
    .attr("class", d => {
      const code = d["Facility.Operator"];
      let group = "GOVT";
      ["AHTNA (GUARD)", "M&TC", "ICA", "LASALLE CORRECTIONS", "AGS", "AKAL", "CEC", "MVM"].forEach(operator => {
        if(operator === code){ 
          group = "OPRIV"; 
        }
      });
      ["CCA", "GEO", "ORR"].forEach(operator => { if(operator === code) group = operator; });
      return group;
    })
    .classed("orange-dot", true)
    .classed("ice-dot", true)
    .attr("data-operator", d => d["Facility.Operator"])
    .attr("id", d => d["DETLOC"] + "-dot")
    .attr("r", defaultRadius * 2);
  dcG.selectAll("circle")
    .data(detCtrs)
    .enter().append("circle")
    .style("stroke", "black")
    .classed("purple-dot", true)
    .classed("dc-dot", true)
    .attr("data-operator", d => d["Owner"])
    .attr("id", d => d["DETLOC"] + "-dot")
    .attr("r", defaultRadius * 1.5);

  map.on("zoomend", d3Update);
  d3Update();
}

function d3Update(){
  [d3.select("#ice-g").selectAll("circle"),
    d3.select("#dc-g").selectAll("circle")].forEach(feature => {
    feature.attr("transform", d => {
      const LL = new L.LatLng(d.lat, d.lon);
      // const pp = map.latLngToLayerPoint(LL);
      return `translate(${map.latLngToLayerPoint(LL).x},${map.latLngToLayerPoint(LL).y})`;
    });
  });
}

function buildPointsLayer() {
  const indexLayer = L.layerGroup();
  const zeroIceFacsLayer = L.layerGroup();
  const iceFacsLayer = L.layerGroup();
  const detCtrsLayer = L.layerGroup();
  
  // iterate over the list object
  zeroIceFacs.forEach(place => {
    if(!isNaN(place.lat)){
      zeroIceFacsLayer.addLayer(buildCircle(place, defaultRadius, orange, false, 0.8));
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
    src="${place.imgur}">
    <div class="media-body">
    <h5>${place["Name"]}</h5>
    <p><strong>${place["State"]}</strong></p>
    <!--<p>${place["Owner"]}</p>-->
    </div>
    `;
    if(!isNaN(place.lat)){
      const circle = buildCircle(place, defaultRadius * 1.5, purple);
      detCtrsLayer.addLayer(circle.bindPopup(popup));
    }
  });
  indexLayer.addLayer(zeroIceFacsLayer).addLayer(iceFacsLayer).addLayer(detCtrsLayer);
  buildD3Points();
  update_texts();
  return indexLayer;
}

function buildCircle(place, radius = 4, color = orange, interactive = true, opacity = 0){
  const circleStyle = {
    interactive, 
    weight: 1,
    radius: radius,
    color: "#000",
    fillColor: color,
    fillOpacity: opacity,
    opacity: opacity
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
    const imgfromOrigin = [$( this ).position().left + 32 - $( window ).width() / 2, 
      $( window ).height() / 2 - $( this ).position().top - 128];
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
    $("#d3-leaflet-svg").hide();
    break;
  case "the-eye":
    $("#d3-leaflet-svg").hide();
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
    $("#d3-leaflet-svg").show();
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
    $("#d3-leaflet-svg").show();
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
    $("#d3-leaflet-svg").hide();
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
  $("#legend").html("<div class='px-3 py-2'><svg class='float-left' height='40' width='50'><rect width='50' height='40' class='orange-polygon' /></svg><span data-i18n='ta-trap-legend' class='markdownify'></span></div>");
  update_texts();
  moveLegend();
  $("#legend").show();
}

function buildPointsLegend(){
  $("#legend").html(() => {
    return `<div class="row px-3 pt-2">
      <div class="col-sm-4">
        <div class="media">
          <svg  height="${defaultRadius * 5}" width="${defaultRadius * 5}">
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
          <svg height="${defaultRadius * 5}" width="${defaultRadius * 5}">
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
          <svg height="${defaultRadius * 5}" width="${defaultRadius * 5}">
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
    <p class="mx-3 mb-2" data-i18n="ta-clinks-legend-supp-text"></p>`;
  });
  update_texts();
  moveLegend();
  $("#legend").show();
}

function buildCharts() {
  d3.csv("/torn-apart/assets/data/iceFacs.csv", (error, data) => {
    if (error) throw error;

    d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

    const margins = {top: 10, bottom: 32, left: 32, right: rem};
    const svgHeight = 200;
    const svgWidth = $("#total-places-svg-div").width();
    const thirdWidth = Math.floor(svgWidth * 2 / 3);
    const fadedgreen = "rgba(102, 194, 165, 0.9)";
    const fadedorange = "rgba(252, 141, 98, 0.9)";
    const fadedpurple = "rgba(141, 160, 203, 0.9)";
    const fadedpink = "rgba(231, 138, 195, 0.9)";
    const fadedblack = "rgba(51, 51, 51, 0.9)";

    // Init the charts.
    const tp = { data: [], margins, id: "#total-places-svg", ymax: 400, i18n: "ta-number-of-facilities", showFY: true };
    const adp = { data: [], margins, id: "#adp-svg", ymax: 50000, i18n: "ta-avg-daily-pop", showFY: true };
    const bookins = { data: [], margins, id: "#bookins-svg", ymax: 900000, i18n: "ta-bookins", showFY: true };
    const operators = { data: [{group: "OPRIV", taName: "Other Private", facilityCount: 0, adpCount: 0}, {group: "GOVT", name: "Government", facilityCount: 0, adpCount: 0}], 
      margins: { top: 0, bottom: 0, left: 0, right: 0},
      id: "#operators-svg", number: "facilityCount", svgWidth: thirdWidth };
    const operatorsAdp = { margins: { top: 0, bottom: 0, left: 0, right: 0},
      id: "#operators-adp-svg", number: "adpCount", svgWidth: thirdWidth };
    const mandays = { data: data.map(row => {
      let name = `<a href="#" class="map-icon d-none d-md-inline"
        data-latlng="${row.lat},${row.lon}" data-detloc="${row["DETLOC"]}"><i class="fa fa-map"></i></a>&nbsp;`;
      if(row.lat === "NA"){
        name = "<i class='fa fa-user-secret'></i>&nbsp;";
      }
      name = name + titleize(row["Name"].replace(/\([^)]*\)/, ""));
      const operator = facOperators.filter(o => o.code === row["Facility.Operator"])[0];
      if(operator && operator.name){
        if(operator.url){
          name = name + `, <a href="${operator.url}">${operator.name}</a>`;
        } else {
          name = name + `, ${operator.name}`;
        }
      }
      return {
        lat: +row.lat,
        lon: +row.lon,
        name,
        mandays: +row["FY17.Total.Mandays"],
        pctDaysInUse: +row["FY17...of.Days.in.Use"] };
    }) };

    ["2014", "2015", "2016", "2017", "2018"].forEach(year => {
      const fy = year.replace("20", "FY");
      tp.data.push([fy, data.filter(d => +d[fy + ".ADP"] > 0).length]);
      adp.data.push([fy, d3.sum(data.map(d => +d[fy + ".ADP"]))]);
      if (year !== "2014"){
        bookins.data.push([fy, d3.sum(data.map(d => +d[fy + ".Facility.Bookins"]))]);
      }
    });

    [tp, adp, bookins, operators, operatorsAdp].forEach(chart => initChart(chart, svgWidth, svgHeight));

    [tp, adp, bookins].forEach(chart => {
      chart.x = d3.scaleBand().rangeRound([0, chart.width]).padding(0.1);
      chart.y = d3.scaleLinear().rangeRound([chart.height, 0]);
      chart.x.domain(chart.data.map(d => d[0]));
      chart.y.domain([0, chart.ymax]);
      $(chart.id.replace("svg", "no")).html(d3.format(",.0f")(chart.data[chart.data.length - 1][1]));
      chart.g.selectAll(".bar")
        .data(chart.data).enter().append("rect").attr("class", "bar")
        .attr("y", d => chart.y(d[1])).attr("x", d => chart.x(d[0]))
        .attr("height", d => chart.height - chart.y(d[1]))
        .attr("width", chart.x.bandwidth());
      chart.g.append("g").attr("transform", `translate(0,${chart.height})`)
        .call(d3.axisBottom(chart.x));
      chart.g.append("g").call(d3.axisLeft(chart.y).ticks(5).tickFormat(d3.format(".2s"))).append("text")
        .attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em")
        .attr("text-anchor", "end").attr("data-i18n", chart.i18n);
      if(chart.showFY){
        chart.svg.append("text").attr("transform", `translate(${svgWidth - chart.margins.right},${svgHeight - 4})`)
          .attr("text-anchor", "end").attr("data-i18n", "ta-fiscal-year-begins");
      }
    });

    ["GEO", "CCA", "ORR"].forEach( code => {
      const operator = facOperators.filter(o => o.code === code)[0];
      operators.data.push({
        group: code,
        name: operator.name,
        url: operator.url,
        facilityCount: data.filter(f => f["Facility.Operator"] === code).length,
        adpCount: d3.sum(data.filter(f => f["Facility.Operator"] === code).map(d => +d["FY18.ADP"]))
      });
    });
    ["AHTNA (GUARD)", "M&TC", "ICA", "LASALLE CORRECTIONS", "AGS", "AKAL", "CEC", "MVM"].forEach( code => {
      operators.data[0].facilityCount += data.filter(f => f["Facility.Operator"] === code).length;
      operators.data[0].adpCount += d3.sum(data.filter(f => f["Facility.Operator"] === code).map(d => +d["FY18.ADP"]));
    });
    operators.data[1].facilityCount = data.filter(d => +d["FY18.ADP"] > 0).length - d3.sum(operators.data.map(d => +d.facilityCount));
    operators.data[1].adpCount = d3.sum(data.map(d => +d["FY18.ADP"])) - d3.sum(operators.data.map(d => +d.facilityCount));
    [fadedpink, fadedgreen, fadedorange, fadedpurple, fadedblack].forEach((color, i) => {
      operators.data[i].color = color;
    });
    operatorsAdp.data = operators.data;
    [operators, operatorsAdp].forEach(chart => {
      const radius = Math.min(chart.width, chart.height)/2;
      chart.g.attr("id", `${chart.number}-g`).attr("transform", `translate(${$(chart.id).width() / 2},${chart.height / 2})`);
      const pie = d3.pie()
        .sort(null)
        .value(d => +d[chart.number]);
      const path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
      const arc = chart.g.selectAll(".arc")
        .data(pie(chart.data))
        .enter().append("g")
        .classed("arc", true);
      arc.append("path")
        .attr("d", path)
        .attr("class", d => `${d.data.group}-slice`)
        .attr("data-group", d => d.data.group)
        .attr("fill", d => d.data.color)
        .style("stroke-width", 0)
        .style("stroke", "black")
        .style("opacity", 0.7)
        .on("click", function(){
          const slice = d3.select(this);
          d3.selectAll(".clicked")
            .transition().delay(0).duration(250)
            .style("stroke-width", 0)
            .style("opacity", "0.7");
          d3.selectAll(".clicked")
            .classed("clicked", false);
          if(slice.classed("ORR-slice")){
            d3.selectAll(".highlighted-dot").classed("highlighted-dot", false)
              .transition().delay(0).duration(250)
              .style("fill", orange);
          } else {
            if (!slice.classed("clicked")){
              d3.selectAll(`.${slice.attr("data-group")}-slice`).classed("clicked", true)
                .transition().delay(0).duration(250)
                .style("stroke-width", 5)
                .style("opacity", "1");
              d3.selectAll(".highlighted-dot").classed("highlighted-dot", false)
                .transition().delay(0).duration(250)
                .style("fill", orange);
              const selector = `.ice-dot.${slice.attr("data-group")}`;
              // d3.select("#ice-g").selectAll("circle").each(function(d){
              //   console.log(d);
              // });
              d3.selectAll(selector).classed("highlighted-dot", true)
                .moveToFront()
                .transition().delay(100).duration(500)
                .style("fill", "red");
            }
          }
        });
          
    });

    buildSpreadsheet(mandays);
    update_texts();
  });

}

function initChart(chart, svgWidth, svgHeight){
  let svgW;
  if(chart.svgWidth){
    svgW = chart.svgWidth;
  } else {
    svgW = svgWidth;
  }
  chart.height = svgHeight - chart.margins.top - chart.margins.bottom;
  chart.width = svgW - chart.margins.left - chart.margins.right;
  chart.svg = d3.select(chart.id).attr("height", svgHeight);
  chart.g = chart.svg.append("g").attr("transform", `translate(${chart.margins.left},${chart.margins.top})`);
}

function buildSpreadsheet(mandays){
  const table = d3.select("#mandays-table-div").append("table")
      .classed("table", true).classed("table-hover", true).classed("table-sm", true),
    titles = ["name", "mandays", "pctDaysInUse"];//d3.keys(mandays.data[0]);
  table.append("thead").append("tr").classed("thead-dark", true)
    .selectAll("th")
    .data(titles).enter()
    .append("th")
    .attr("data-i18n", d => `ta-${d}-header`);
  const rows = table.append("tbody").selectAll("tr")
    .data(mandays.data.filter(d => d.mandays > 0).sort((b, a) => a.mandays - b.mandays)).enter().append("tr");
  rows.selectAll("td")
    .data(d => titles.map(k => { return { "value": d[k], "name":  k}; })).enter()
    .append("td").attr("data-th", d => d.name).html(d => {
      if(d.name === "name"){
        return d.value;
      } else if (d.name === "mandays") {
        return d3.format(",.0f")(d.value);
      } else {
        return `${Math.floor(d.value * 100)}%`;
      }
    });
  $(".map-icon").click(function(e) {
    e.preventDefault();
    const zoom = 12;
    const latLon = $( this ).data("latlng").split(",");
    const pixelCoords = map.project(L.latLng(latLon), zoom);
    const newCenter = L.point(pixelCoords.x - .25 * $( window ).width(), pixelCoords.y + .1 * $( window ).width());
    const newlatLng = map.unproject(newCenter, zoom);
    map.flyTo(newlatLng, zoom);
    d3.select(`#${$( this ).data("detloc")}-dot`).transition()
      .delay(1000)
      .duration(6000)
      .attr("r", defaultRadius * 6)
      .style("fill", "red");
    d3.select(`#${$( this ).data("detloc")}-dot`).transition()
      .delay(20000)
      .duration(5000)
      .attr("r", defaultRadius * 2)
      .style("fill", orange);
    
  });
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
    g = svg.append("g");//.classed("leaflet-zoom-hide", true).classed("chartLayer", true);

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

function formatRedacted(){
  $(".redacted").html((i, html) => html.split(" ").map(text => `<span class="redacted-span">${text}</span>`).join(" "));
}

function formatFootnotes(){
  $(".footnotes").prepend("<hr><h2 class='footnotes-header'>Footnotes</h2>");
  $(".footnotes ol li p").html((i, html) => html.replace("↩", "<i class='fa fa-undo'></i>"));
}

