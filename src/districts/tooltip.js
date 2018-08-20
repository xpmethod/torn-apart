import $ from "jquery";
import { bigMoneyFormat } from "../utils";

export default function (geoJSONFeature){
  const d = geoJSONFeature.properties;
  const html = [`<h4>${ d.state } <small>${ d.districtName }</small></h4>`];
  html.push(`<h3>${ $.i18n("ta-ice-money-since-2013-tooltip") }:<br/><strong>$${ bigMoneyFormat(d.total_value) }</strong></h3>`);
  html.push(`<img src="${ d.representative_photo_url }" 
    alt="Photo of ${ d.representative }" 
    class="rounded float-left mr-3">`);
  html.push(`<h4><strong>${$.i18n(`ta-${ d.party }-cong`)}</strong></h4>`);
  html.push(`<h4>${ d.representative }</h4>`);
  html.push(`<h4><br />${ $.i18n("ta-districts-biggest-profiteer") }:<br />
      ${ d.profiteer.name }, $${ bigMoneyFormat(d.profiteer.value) }</h4>`);
  return html.join("\n");
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
 
