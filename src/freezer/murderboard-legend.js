import $ from "jquery";
import { orange, purple, green, pink } from "../constants";

export default function() {
  const size = 20;
  $("#legend")
    .show()
    .html(() => {
      const html = [
        "<div class='px-3 py-2'><div><p data-i18n='ta-v2-freezer-description'></p></div>"
      ]; //

      html.push(`<div class="row form-group"><div class = "col-md-1">
        <svg class="legend-svg" height="${size}" width="${size}">
          <rect height="${size}" width="${size}" class="legend-polygon" fill="${purple}" /></svg></div>`);
      html.push(
        "<div class ='col-md-5'><p class='axis' data-i18n='ta-contractor'></p></div>"
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
        "<div class='col-md-5'><p class='axis' data-i18n='ta-subsidiary-contractor'></p></div>"
      );

      html.push(`<div class = "col-md-1"><svg class="legend-svg" height="${size}" width="${size}"><rect height="${size}" width="${size}" class="legend-polygon" fill="${pink}"/>
        </svg>
        </div>`);

      html.push(
        "<div class ='col-md-5'><p class='axis' data-i18n='ta-product-category'></p></div></div>"
      );
      html.push(
        "<div class ='col-md-5'><p class='axis' data-i18n='ta-product-category'></p></div></div>"
      );
      return html.join("\n");
    });
}
