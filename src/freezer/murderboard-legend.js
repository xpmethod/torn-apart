import $ from "jquery";
import { moveLegend } from "../utils";
import updateTexts from "../update-texts";
import { orange, purple, green, pink } from "../constants";

export default function() {
  const size = 20;
  $("#legend")
    .show()
    .html(() => {
      const html = [
        "<div class='px-3 py-2'><div><p data-i18n='ta-murderboard-legend-title'></p></div>"
      ]; //

      html.push(`<div class="row form-group"><div class = "col-md-1">
        <svg class="legend-svg" height="${size}" width="${size}">
          <rect height="${size}" width="${size}" class="legend-polygon" fill="${purple}" /></svg></div>`);
      html.push(
        "<div class ='col-md-5'><p class='axis' data-i18n='ta-parent-company'></p></div>"
      );
      html.push(`<div class = "col-md-1"><svg class="legend-svg" height="${size}" width="${size}"><rect height="${size}" width="${size}" class="legend-polygon" fill="${green}"/>
          </svg></div>`);

      html.push(
        "<div class ='col-md-5'><p class='axis' data-i18n='ta-product'></p></div></div>"
      );
      html.push(
        `<div class = "row form-group"><div class = "col-md-1"><svg class="legend-svg" height="${size}" width="${size}">        <rect height="${size}" width="${size}" class="legend-polygon" fill="${orange}" /></svg></div>`
      );

      html.push(
        "<div class='col-md-5'><p class='axis' data-i18n='ta-company'></p></div>"
      );

      html.push(`<div class = "col-md-1"><svg class="legend-svg" height="${size}" width="${size}"><rect height="${size}" width="${size}" class="legend-polygon" fill="${pink}"/>
        </svg>
        </div>`);

      html.push(
        "<div class ='col-md-5'><p class='axis' data-i18n='ta-product-category'></p></div></div>"
      );

      return html.join("\n");
    });
  updateTexts();
  moveLegend();
}
