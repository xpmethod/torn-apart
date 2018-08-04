import { green, orange, purple, pink, lime, beige, tan } from "../constants";
import { selection} from "d3-selection";
import $ from "jquery";
import initChart from "../charts/init";
import buildPieChart from "./pie-chart";
import buildLexicalFog from "./lexical-fog";
import {fillV2DivHeight } from "../utils";

export default function() {

  // this method is supposed to allow me to move d3 layers to the front. Not
  // sure it's working.
 // selection.prototype.moveToFront = function() {  
 //   return this.each(function(){
 //     this.parentNode.appendChild(this);
 //   });
 // };

  
  // Set some constants.
  //const margins = {top: 10, bottom: 32, left: 32, right: rem};

  const svgHeight = fillV2DivHeight("#wall-of-shame-header");
 

  // The width is calculated on the fly by measuring how wide this div is.
  // it only catches this width because it is already showing the div.
  const svgWidth = $("#pie-chart-div").width();
  // Or what if we want something to be a third of the container wide?
  const thirdWidth = Math.floor(svgWidth / 3.5);
 //radius is thirdWidth/2 - defined in pie-chart.js

 
  // Create the "dataObjects."
  // These create a new object for each visualization with certain expected
  // properties, like an id, an array that will hold the data, etc.
  
  const lexicalFog = {data: [ ], margins: { top: 0, bottom: 0, left: 0, right: 0},
    id: "#lexical-fog-svg", svgWidth: svgWidth
  };
  
  const gender = { data: [
    // As you can see, here data is going to be an array of objects.
    {group: "FEM", taName: "female", count: 184, color: purple}, 
    {group: "NON-FEM", taName: "non-female", count: 940, color: green}
  ], 
  margins: { top: 0, bottom: 0, left: 0, right: 0},
  id: "#gender-svg", number: "count", svgWidth: thirdWidth, svgHeight: thirdWidth
  };
  
  const ethnicity = {data: [
    {group: "BA", taName: "Black-American", ecount: 61, color: green},
    {group: "HA", taName: "Hispanic-American", ecount: 57, color: orange},
    {group: "SAAIA", taName: "Subcontinent-Asian/Asian-Indian-American", ecount: 36, color: purple},
    {group: "AP", taName: "Asian-Pacific", ecount: 31, color: pink},
    {group: "NA", taName: "Native-American", ecount: 21, color: lime} , 
    {group: "OA", taName: "Other-Minority", ecount: 19, color: beige
    },
    {group: "AN", taName: "Alaskan-Native", ecount: 12, color: tan}
  ],  margins: { top: 0, bottom: 0, left: 0, right: 0}, 
  id: "#ethnicity-svg", number: "ecount", svgWidth: thirdWidth , svgHeight: thirdWidth
  };

  const intersectionality = { data: [
    {group: "INT", taName: "intersectional", iCount: 77, color: purple}, 
    {group: "NON-INT", taName: "non-intersectional", iCount: 344, color: green}
  ], 
  margins: { top: 0, bottom: 0, left: 0, right: 0},
  id: "#intersectionality-svg", number: "iCount", svgWidth: thirdWidth , svgHeight: thirdWidth
  };

  // Initialize the charts where appropriate.
  [gender, ethnicity, intersectionality, lexicalFog].forEach(chart => initChart(chart, svgWidth, svgHeight));
  
  //build the word cloud
  buildLexicalFog(lexicalFog);

  // now build a pie chart for the three pie charts
  [gender, ethnicity, intersectionality].forEach(chart => buildPieChart(chart)); 
  
}