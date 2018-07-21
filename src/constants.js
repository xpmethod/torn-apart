import $ from "jquery";
import _ from "lodash";

// The default size of one rem.
export const rem = _.parseInt($("html").css("font-size").replace("px", ""));

// Colors used on the site.
export const green = "#66c2a5";
export const orange = "#fc8d62";
export const purple = "#8da0cb";

// Constant used in banned viz.
export const muslimBanTotal = 208832081;

// Constants for two flyTo bounds.
export const lower48Bounds = [[24.396, -124.848974], [49.384, -66.885444]];
export const southernBorderBounds = [[34.1638, -97.1375], [25.8439, -118.608244]];

