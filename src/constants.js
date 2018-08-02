import $ from "jquery";
import _ from "lodash";
import { schemeSet2 } from "d3-scale-chromatic";

// The default size of one rem.
export const rem = _.parseInt($("html").css("font-size").replace("px", ""));

// Colors used on the site.
export const green = schemeSet2[0];
export const orange = schemeSet2[1];
export const purple = schemeSet2[2];
export const pink = schemeSet2[3];
export const lime = schemeSet2[4];
export const beige = schemeSet2[5];
export const tan = schemeSet2[6];
export const lavender = schemeSet2[7];

// Constant used in banned viz.
export const muslimBanTotal = 208832081;

// Constants for two flyTo bounds.
export const lower48Bounds = [[24.396, -124.848974], [49.384, -66.885444]];
export const southernBorderBounds = [[34.1638, -97.1375], [25.8439, -118.608244]];

// Constants for states.
export const states = [
  { name: "Alabama", abbreviation: "AL", stateFP: "01"},
  { name: "Alaska", abbreviation: "AK", stateFP: "02"},
  { name: "Arizona", abbreviation: "AZ", stateFP: "04"},
  { name: "Arkansas", abbreviation: "AR", stateFP: "05"},
  { name: "California", abbreviation: "CA", stateFP: "06"},
  { name: "Colorado", abbreviation: "CO", stateFP: "08"},
  { name: "Connecticut", abbreviation: "CT", stateFP: "09"},
  { name: "Delaware", abbreviation: "DE", stateFP: "10"},
  { name: "Florida", abbreviation: "FL", stateFP: "12"},
  { name: "Georgia", abbreviation: "GA", stateFP: "13"},
  { name: "Hawaii", abbreviation: "HI", stateFP: "15"},
  { name: "Idaho", abbreviation: "ID", stateFP: "16"},
  { name: "Illinois", abbreviation: "IL", stateFP: "17"},
  { name: "Indiana", abbreviation: "IN", stateFP: "18"},
  { name: "Iowa", abbreviation: "IA", stateFP: "19"},
  { name: "Kansas", abbreviation: "KS", stateFP: "20"},
  { name: "Kentucky", abbreviation: "KY", stateFP: "21"},
  { name: "Louisiana", abbreviation: "LA", stateFP: "22"},
  { name: "Maine", abbreviation: "ME", stateFP: "23"},
  { name: "Maryland", abbreviation: "MD", stateFP: "24"},
  { name: "Massachusetts", abbreviation: "MA", stateFP: "25"},
  { name: "Michigan", abbreviation: "MI", stateFP: "26"},
  { name: "Minnesota", abbreviation: "MN", stateFP: "27"},
  { name: "Mississippi", abbreviation: "MS", stateFP: "28"},
  { name: "Missouri", abbreviation: "MO", stateFP: "29"},
  { name: "Montana", abbreviation: "MT", stateFP: "30"},
  { name: "Nebraska", abbreviation: "NE", stateFP: "31"},
  { name: "Nevada", abbreviation: "NV", stateFP: "32"},
  { name: "New Hampshire", abbreviation: "NH", stateFP: "33"},
  { name: "New Jersey", abbreviation: "NJ", stateFP: "34"},
  { name: "New Mexico", abbreviation: "NM", stateFP: "35"},
  { name: "New York", abbreviation: "NY", stateFP: "36"},
  { name: "North Carolina", abbreviation: "NC", stateFP: "37"},
  { name: "North Dakota", abbreviation: "ND", stateFP: "38"},
  { name: "Ohio", abbreviation: "OH", stateFP: "39"},
  { name: "Oklahoma", abbreviation: "OK", stateFP: "40"},
  { name: "Oregon", abbreviation: "OR", stateFP: "41"},
  { name: "Pennsylvania", abbreviation: "PA", stateFP: "42"},
  { name: "Rhode Island", abbreviation: "RI", stateFP: "44"},
  { name: "South Carolina", abbreviation: "SC", stateFP: "45"},
  { name: "South Dakota", abbreviation: "SD", stateFP: "46"},
  { name: "Tennessee", abbreviation: "TN", stateFP: "47"},
  { name: "Texas", abbreviation: "TX", stateFP: "48"},
  { name: "Utah", abbreviation: "UT", stateFP: "49"},
  { name: "Vermont", abbreviation: "VT", stateFP: "50"},
  { name: "Virginia", abbreviation: "VA", stateFP: "51"},
  { name: "Washington", abbreviation: "WA", stateFP: "53"},
  { name: "West Virginia", abbreviation: "WV", stateFP: "54"},
  { name: "Wisconsin", abbreviation: "WI", stateFP: "55"},
  { name: "Wyoming", abbreviation: "WY", stateFP: "56"}
];
