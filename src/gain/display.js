import $ from "jquery";
import initChart from "../charts/init";
import gainBars from "./bars";
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

  const svgHeight = fillV2DivHeight("#wall-of-gain-header");
 

  // The width is calculated on the fly by measuring how wide this div is.
  // it only catches this width because it is already showing the div.
  const svgWidth = $("#pie-chart-div").width();
 
  // Create the "dataObjects."
  // These create a new object for each visualization with certain expected
  // properties, like an id, an array that will hold the data, etc.
  
  const lexicalFog = {data: [ ], margins: { top: 0, bottom: 0, left: 0, right: 0},
    id: "#lexical-fog-svg", svgWidth: svgWidth
  };
  
  initChart(lexicalFog, svgWidth, svgHeight);
  
  //build the word cloud
  buildLexicalFog(lexicalFog);
  
  gainBars(svgWidth);
}
