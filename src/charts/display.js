import $ from "jquery";
import { selection } from "d3-selection";
import { sum } from "d3-array";
import initChart from "./init";
import buildBarChart from "./bar-chart";
import buildSpreadsheet from "./spreadsheet";
import buildOperatorsData from "./operators-data";
import buildPieChart from "./pie-chart";
import { rem } from "../constants";
import { titleUp } from "../utils";
import Data from "../../data/iceFacs.csv";
import facOperators from "./private-operators.json";

export default function(map) {
  // this method is supposed to allow me to move d3 layers to the front. Not
  // sure it's working.
  selection.prototype.moveToFront = function() {  
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

  // Set some constants.
  const margins = {top: 10, bottom: 32, left: 32, right: rem};
  // Each chart will be 200px high. This seemed right for mobile
  const svgHeight = 200;
  // The width is calculated on the fly by measuring how wide this div is.
  // it only catches this width because it is already showing the div.
  const svgWidth = $("#total-places-svg-div").width();
  // Or what if we want something to be a third of the container wide?
  const thirdWidth = Math.floor(svgWidth * 2 / 3);

  // Create the "dataObjects."
  // These create a new object for each visualization with certain expected
  // properties, like an id, an array that will hold the data, etc.
  const tp = { data: [], margins, id: "#total-places-svg", ymax: 400, i18n: "ta-v1-number-of-facilities", showFY: true };
  const adp = { data: [], margins, id: "#adp-svg", ymax: 50000, i18n: "ta-v1-avg-daily-pop", showFY: true };
  const bookins = { data: [], margins, id: "#bookins-svg", ymax: 900000, i18n: "ta-v1-bookins", showFY: true };
  const operators = { data: [
    // As you can see, here data is going to be an array of objects.
    {group: "OPRIV", taName: "Other Private", facilityCount: 0, adpCount: 0}, 
    {group: "GOVT", name: "Government", facilityCount: 0, adpCount: 0}
  ], 
  margins: { top: 0, bottom: 0, left: 0, right: 0},
  id: "#operators-svg", number: "facilityCount", svgWidth: thirdWidth 
  };
  const operatorsAdp = { margins: { top: 0, bottom: 0, left: 0, right: 0},
    id: "#operators-adp-svg", number: "adpCount", svgWidth: thirdWidth };
  // The data for the Mandays is calculated on the fly with a #map.
  const mandays = { data: Data.map(row => {
    let name = `<a href="#" class="map-icon d-none d-md-inline"
      data-latlng="${row.lat},${row.lon}" data-detloc="${row.DETLOC}"><i class="fa fa-map"></i></a>&nbsp;`;
    if(row.lat === "NA"){
      name = "<i class='fa fa-user-secret'></i>&nbsp;";
    }
    name = name + titleUp(row.Name.replace(/\([^)]*\)/, ""));
    const operator = facOperators.filter(o => o.code === row["Facility.Operator"])[0];
    if(operator && operator.name){
      if(operator.url){
        name = name + `, <a href="${operator.url}">${operator.name}</a>`;
      } else {
        name = name + `, ${operator.name}`;
      }
    }
    // Data, then, is an array of objects that look like the below.
    return {
      lat: +row.lat,
      lon: +row.lon,
      name,
      mandays: +row["FY17.Total.Mandays"],
      pctDaysInUse: +row["FY17...of.Days.in.Use"] 
    };
  }) };

  // fill in the data array for tp, adp, and bookins.
  ["2014", "2015", "2016", "2017", "2018"].forEach(year => {
    const fy = year.replace("20", "FY");
    tp.data.push([fy, Data.filter(d => +d[fy + ".ADP"] > 0).length]);
    adp.data.push([fy, sum(Data.map(d => +d[fy + ".ADP"]))]);
    if (year !== "2014"){
      bookins.data.push([fy, sum(Data.map(d => +d[fy + ".Facility.Bookins"]))]);
    }
  });

  // Initialize the charts where appropriate.
  [tp, adp, bookins, operators, operatorsAdp].forEach(chart => initChart(chart, svgWidth, svgHeight));

  // build the bar charts.
  [tp, adp, bookins].forEach(dataObject => buildBarChart(dataObject, svgHeight, svgWidth));

  // fill in the operators data.
  buildOperatorsData(operators);

  // duplicate the operators data for operatorsADP.
  operatorsAdp.data = operators.data;

  // now build a pie chart for both
  [operators, operatorsAdp].forEach(chart => buildPieChart(chart)); 

  // Finally, fill in the spreadsheet for Mandays.
  buildSpreadsheet(mandays, map);
}
