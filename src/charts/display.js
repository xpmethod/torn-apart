import $ from "jquery";
import { select, selectAll, selection } from "d3-selection";
// import { transition } from "d3-transition";
import "d3-transition";
import { sum } from "d3-array";
import { pie, arc } from "d3-shape";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { format } from "d3-format";
import initChart from "./init";
import buildSpreadsheet from "./spreadsheet";
import { rem, orange } from "../constants";
import { titleUp } from "../utils";
import facOperators from "./private-operators.json";
import Data from "../../data/iceFacs.csv";

export default function(map) {
  selection.prototype.moveToFront = function() {  
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

  const margins = {top: 10, bottom: 32, left: 32, right: rem};
  const svgHeight = 200;
  // it only catches this width because it is already showing the div.
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
  const mandays = { data: Data.map(row => {
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
    tp.data.push([fy, Data.filter(d => +d[fy + ".ADP"] > 0).length]);
    adp.data.push([fy, sum(Data.map(d => +d[fy + ".ADP"]))]);
    if (year !== "2014"){
      bookins.data.push([fy, sum(Data.map(d => +d[fy + ".Facility.Bookins"]))]);
    }
  });

  [tp, adp, bookins, operators, operatorsAdp].forEach(chart => initChart(chart, svgWidth, svgHeight));

  [tp, adp, bookins].forEach(chart => {
    chart.x = scaleBand().rangeRound([0, chart.width]).padding(0.1);
    chart.y = scaleLinear().rangeRound([chart.height, 0]);
    chart.x.domain(chart.data.map(d => d[0]));
    chart.y.domain([0, chart.ymax]);
    $(chart.id.replace("svg", "no")).html(format(",.0f")(chart.data[chart.data.length - 1][1]));
    chart.g.selectAll(".bar")
      .data(chart.data).enter().append("rect").attr("class", "bar")
      .attr("y", d => chart.y(d[1])).attr("x", d => chart.x(d[0]))
      .attr("height", d => chart.height - chart.y(d[1]))
      .attr("width", chart.x.bandwidth());
    chart.g.append("g").attr("transform", `translate(0,${chart.height})`)
      .call(axisBottom(chart.x));
    chart.g.append("g").call(axisLeft(chart.y).ticks(5).tickFormat(format(".2s"))).append("text")
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
      facilityCount: Data.filter(f => f["Facility.Operator"] === code).length,
      adpCount: sum(Data.filter(f => f["Facility.Operator"] === code).map(d => +d["FY18.ADP"]))
    });
  });
  ["AHTNA (GUARD)", "M&TC", "ICA", "LASALLE CORRECTIONS", "AGS", "AKAL", "CEC", "MVM"].forEach( code => {
    operators.data[0].facilityCount += Data.filter(f => f["Facility.Operator"] === code).length;
    operators.data[0].adpCount += sum(Data.filter(f => f["Facility.Operator"] === code).map(d => +d["FY18.ADP"]));
  });
  operators.data[1].facilityCount = Data.filter(d => +d["FY18.ADP"] > 0).length - sum(operators.data.map(d => +d.facilityCount));
  operators.data[1].adpCount = sum(Data.map(d => +d["FY18.ADP"])) - sum(operators.data.map(d => +d.facilityCount));
  [fadedpink, fadedgreen, fadedorange, fadedpurple, fadedblack].forEach((color, i) => {
    operators.data[i].color = color;
  });
  operatorsAdp.data = operators.data;
  [operators, operatorsAdp].forEach(chart => {
    const radius = Math.min(chart.width, chart.height)/2;
    chart.g.attr("id", `${chart.number}-g`).attr("transform", `translate(${$(chart.id).width() / 2},${chart.height / 2})`);
    const thePie = pie()
      .sort(null)
      .value(d => +d[chart.number]);
    const path = arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    const theArc = chart.g.selectAll(".arc")
      .data(thePie(chart.data))
      .enter().append("g")
      .classed("arc", true);
    theArc.append("path")
      .attr("d", path)
      .attr("class", d => `${d.data.group}-slice`)
      .attr("data-group", d => d.data.group)
      .attr("fill", d => d.data.color)
      .style("stroke-width", 0)
      .style("stroke", "black")
      .style("opacity", 0.7)
      .on("click", function(){
        const slice = select(this);
        selectAll(".clicked")
          .transition().delay(0).duration(250)
          .style("stroke-width", 0)
          .style("opacity", "0.7");
        if(slice.classed("ORR-slice")){
          selectAll(".highlighted-dot").classed("highlighted-dot", false)
            .transition().delay(0).duration(250)
            .style("fill", orange);
          selectAll(".clicked")
            .classed("clicked", false);
        } else {
          if (!slice.classed("clicked")){
            selectAll(`.${slice.attr("data-group")}-slice`).classed("clicked", true)
              .transition().delay(0).duration(250)
              .style("stroke-width", 5)
              .style("opacity", "1");
            selectAll(".highlighted-dot").classed("highlighted-dot", false)
              .transition().delay(0).duration(250)
              .style("fill", orange);
            const selector = `.ice-dot.${slice.attr("data-group")}`;
            selectAll(selector).classed("highlighted-dot", true)
              .moveToFront()
              .transition().delay(100).duration(500)
              .style("fill", "red");
          } else {
            slice.transition().delay(0).duration(250)
              .style("stroke-width", 0)
              .style("opacity", "0.7");
            selectAll(".highlighted-dot").classed("highlighted-dot", false)
              .transition().delay(0).duration(250)
              .style("fill", orange);
            selectAll(".clicked")
              .classed("clicked", false);
          }
        }
      });
        
  });
  buildSpreadsheet(mandays, map);
}
