import _ from "lodash";
import $ from "jquery";
import { getOrdinalSuffix } from "../utils";
import states from "../states";

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
  const html = [`<h3>${ state } - ${ districtName } District</h3>`];
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
 
