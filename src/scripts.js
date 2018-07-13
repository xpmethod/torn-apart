// More globals
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
      name = name + titleUp(row["Name"].replace(/\([^)]*\)/, ""));
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
          if(slice.classed("ORR-slice")){
            d3.selectAll(".highlighted-dot").classed("highlighted-dot", false)
              .transition().delay(0).duration(250)
              .style("fill", orange);
            d3.selectAll(".clicked")
              .classed("clicked", false);
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
              d3.selectAll(selector).classed("highlighted-dot", true)
                .moveToFront()
                .transition().delay(100).duration(500)
                .style("fill", "red");
            } else {
              slice.transition().delay(0).duration(250)
                .style("stroke-width", 0)
                .style("opacity", "0.7");
              d3.selectAll(".highlighted-dot").classed("highlighted-dot", false)
                .transition().delay(0).duration(250)
                .style("fill", orange);
              d3.selectAll(".clicked")
                .classed("clicked", false);
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

function projectPoint(x, y) {
  var point = map.latLngToLayerPoint(new L.LatLng(y, x));
  this.stream.point(point.x, point.y);
}

function buildBanned(){
  const loop = 10000;
  const loopFactor = 0.1;
  $("#drawing-dialog").show();
  $("#banned-legend").click(function(){ $(this).hide(); }).css("margin-bottom", $(".leaflet-control-attribution").height() + rem);

  const banTotal = 208832081;
  $(map.getPanes().overlayPane).append("<svg id='d3-banned-svg'></svg>");
  loopBanned(banTotal, loop, loopFactor);
  setTimeout(() => {$("#banned-legend").show(loop * loopFactor);}, loop);
}

function loopBanned(banTotal, loop, loopFactor){
  const fadeDuration = loop * loopFactor;
  d3.select("#drawing-dialog").transition()
    .transition().delay(0).duration(loop + fadeDuration)
    .style("transform", "scale(0, 0)");
  timer = setTimeout(() => {
    d3.queue()
      .defer(callback => {
        d3.json("/torn-apart/assets/data/us-population.json", (e, data) => {
          if (e) throw e;
          callback(null, composeTotal(banTotal, data));
        });
      })
      .await((e, steps) => {
        if (e) throw e;
        const lastState = steps.steps.pop();
        steps.banTotal = steps.banTotal - lastState.population;
        $("#banned-legend p em").html((i, html) => html.replace(/\S*%/, `${Math.floor(100 * steps.banTotal / banTotal)}%`));
        const svg = d3.select("#d3-banned-svg");
        svg.selectAll("g").remove();
        const g = svg.append("g").attr("class", "leaflet-zoom-hide");
        d3.json("/torn-apart/assets/data/us48.geojson", (e, geojson) => {
          const collection = turf.featureCollection(steps.steps.map(state => geojson.features.filter( feature => feature.properties.code === `US-${state.code}`)[0]));
          const transform = d3.geoTransform({ point: projectPoint }),
            path = d3.geoPath().projection(transform);
          const feature = g.selectAll("path").data(collection.features)
            .enter().append("path").attr("opacity", 0).classed("banned-state", true).attr("stroke-width", 4);

          reset();
          
          function reset() {
            const bounds = path.bounds(collection),
              topLeft = bounds[0],
              bottomRight = bounds[1];
            svg.attr("width", bottomRight[0] - topLeft[0])
              .attr("height", bottomRight[1] - topLeft[1])
              .style("left", topLeft[0] + "px")
              .style("top", topLeft[1] + "px");
            g.attr("transform", `translate(${-topLeft[0]},${-topLeft[1]})`);
            feature.attr("d", path)
              .transition()
              .delay(0).duration(fadeDuration)
              .style("opacity", 1);
            feature.transition()
              .delay(loop - fadeDuration).duration(fadeDuration)
              .style("opacity", 0);
          }
        });
      });
    loopBanned(banTotal, loop, loopFactor);
  }, loop);
}

function composeTotal(banTotal, data, steps = []){
  let state;
  if (steps.length === 0){
    state = d3.shuffle(data).pop();
    steps.push(state);
    composeTotal(banTotal - state.population, data, steps);
  } else if (banTotal > 0) {
    state = neighbor(steps, data);
    if(state !== "no more cands"){
      steps.push(state);
      composeTotal(banTotal - state.population, data, steps);
    }
  }  
  return { banTotal, steps };
  // return { banTotal, states: steps.map(state => `US-${state.code}`) };
}

function neighbor(steps, data = []){
  for( let i = steps.length - 1; i >= 0; i--  ){
    const prevState = steps[i];
    if (prevState.neighbors.length > 0){
      let code = d3.shuffle(prevState.neighbors).pop();
      let candState = data.filter( datum =>  datum.code === code)[0];
      if(candState){
        [data, steps].forEach(datum => {
          datum.forEach((step) => {
            step.neighbors = step.neighbors.filter(neighbor => neighbor !== candState.code);
          });
        });
        return candState;
      }
    }
  }
  return "no more cands";
}
