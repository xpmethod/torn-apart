import $ from "jquery";
import { format } from "d3-format";

export default {
  yMax: 57296,
  rangeMax: window.matchMedia("(max-width: 576px)").matches ? 150 : 300,
  barWidth: window.matchMedia("(max-width: 576px)").matches ? 10 : 20,
  opacity: 0.8,
  tooltipPlural(d) {
    return `<strong>${d.name}</strong><br />
        ${format(",")(Math.floor(d.currValue))}
        <span data-i18n="ta-v2-people-removed">${$.i18n(
          "ta-v2-people-removed"
        )}</span> ${d.currYear}.`;
  },
  tooltipSingular(d) {
    return `<strong>${d.name}</strong><br />
        ${format(",")(Math.floor(d.currValue))} 
        <span data-i18n="ta-v2-person-removed">${$.i18n(
          "ta-v2-person-removed"
        )}</span> ${d.currYear}.`;
  }
};
