import _ from "lodash";
import $ from "jquery";
import { getOrdinalSuffix } from "../utils";
import states from "../states";
import {format} from "d3-format";
import {titleUp} from "../utils";

export default function (geoJSONFeature){
  const d = geoJSONFeature.properties;
  const state = _.find(states, { stateFP: d.STATEFP }).name;
  let districtName;
  if(d.CD115FP === "00"){
    districtName = $.i18n("ta-at-large-district");
  } else {
    const districtNumber = _.toInteger(d.CD115FP);
    districtName = $.i18n(`ta-ordinal-${ getOrdinalSuffix(districtNumber) }-m`)
      .replace(/N/, districtNumber);
  }
  
  const repName = d.representative; 
  const party = d.party; 
  const pic = d.representative_photo_url; //I fucked up the image url in the csv earlier but now I've fixed it, so you just need to rebuild the json from the csv
  
  // const pic = "https://upload.wikimedia.org/wikipedia/commons/7/71/Rep_Bradley_Byrne_%28cropped%29.jpg"; //if you want to test photo placement meanwhile you can test with this
  
  const totalAwards = $.i18n("ta-total-awards") + ": $" + format(",")(Math.round(d.total_value)); 
  
  var lucrative = "";
  if(d.awards.length > 0){ //making  sure we don't get a heading for "most lucrative awards" if there are none
    
    lucrative = "<h4>" + $.i18n("ta-most-lucrative") + ":</h4><ul>";
    let i = 0;
  
    for (i = 0; i< d.awards.length; i=i+1){
      lucrative = lucrative + "<li>" + titleUp(d.awards[i].childCompany) + ": $" + format(",")(Math.round(d.awards[i].currentValue)) + " (" + d.awards[i].fiscalYear + ")</li>";
    } //note: using currentValue here means some have $0. Should we use potential value in that case instead?
  }
  lucrative = lucrative + "</ul>";
  
  
  const html = [`<h3>${ state } - ${ districtName } District</h3><p>${ repName } (${ party }) <img src="${ pic }" alt="photo" height = "90px" align="right"></img></p><p>${ totalAwards }</p>${ lucrative }`]; 
  // html.push(`<img class="float-right">

  return html.join("d");
}
// vG"properties": {
//         "STATEFP": "13",
//         "CD115FP": "11",
//         "AFFGEOID": "5001500US1311",
//         "GEOID": "1311",
//         "LSAD": "C2",
//         "CDSESSN": "115",
//         "ALAND": 2773088054,
//         "AWATER": 70602060,
//         "display_label": "Congressional District 11 (115th Congress), Georgia",
//         "party": "R",
//         "representative": "Barry Loudermilk",
//         "representative_photo_url": "https://en.wikipedia.org/wiki/File:Barry_Loudermilk_official_photo_(cropped).jpg",
//         "fy13": 0,
//         "fy14": 0,
//         "fy15": 0,
//         "fy16": 0,
//         "fy17": 0,
//         "fy18": 0,
//         "awards": [],
//         "total_value": 0,
//         "district_url": "https://en.wikipedia.org/wiki/Georgia%27s_11th_congressional_district"
 
