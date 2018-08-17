import $ from "jquery";
import _ from "lodash";
import { schemeSet2 } from "d3-scale-chromatic";
import States from "./states";

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
export const darkGreen = "#3a9276";
export const lightGreen = "#b6e2d4";

// Constant used in banned viz.
export const muslimBanTotal = 208832081;

// Constants for two flyTo bounds.
export const lower48Bounds = [[24.396, -124.848974], [49.384, -66.885444]];
export const southernBorderBounds = [[34.1638, -97.1375], [25.8439, -118.608244]];

// Constants for states.
export const states = States;

export const opacityRange5 = [0.2, 0.4, 0.6, 0.8, 1];
