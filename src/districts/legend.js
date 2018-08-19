import $ from "jquery";
import { min, max } from "d3-array";
import _ from "lodash";
import { moveLegend, bigMoneyFormat } from "../utils";
import updateTexts from "../update-texts";
import { orange, purple, green, opacityRange5 } from "../constants";

export default function(bins){
  const height = 20;
  $("#legend").show().html(() => {
    const html = ["<div class='px-3 py-2'><div><p data-i18n='ta-ice-money-since-2013'></p></div><div class='d-flex'>"];// <div class='d-flex justify-content-between'>"];
    const breaks = _.map(bins, (bin) => {
      return {
        max: max(bin),
        min: min(bin)
      };
    });
    _.each(breaks, (bk, i) => {
      let legend;
      if(bk.min === bk.max) {
        legend = `$${bigMoneyFormat(bk.max)}`;
      } else {
        legend = `$${bigMoneyFormat(bk.min)} – $${bigMoneyFormat(bk.max)}`;
      }
      html.push(`<div class="flex-fill"><div class="legend-svg-div">
        <svg class="legend-svg" height="${3 * height}" width="20">
          <rect height="${height}" width="20" class="legend-polygon" fill="${purple}" opacity="${opacityRange5[i]}"/>
          <rect height="${height}" width="20" class="legend-polygon" fill="${green}" opacity="${opacityRange5[i]}" transform="translate(0,${height})"/>
          <rect height="${height}" width="20" class="legend-polygon" fill="${orange}" opacity="${opacityRange5[i]}" transform="translate(0,${2 * height})"/>
        </svg>
        </div>
        <div>
          <p class="px-1">
            ${legend}
          </p>
        </div>
        </div>`);
    });
    html.push("<div class='flex-fill'><div class='pl-1 legend-svg-div'><p class='axis' data-i18n='ta-republican-cong'></p><p class='axis' data-i18n='ta-democrat-cong'></p><p class='axis' data-i18n='ta-no-rep-cong'></p></div><div>&nbsp;</div>");
    html.push("</div></div>");
    // console.log(html.join("\n"));
    return html.join("\n");
  });
  updateTexts();
  moveLegend();
  
  // const divWidth = Math.floor($(".legend-svg-div").width());
  $(".legend-svg").attr("width", function(){
    const width = $(this).parent().width();
    $(this).children().attr("width", width);
    return width;
  });
  // $(".legend-polygon").attr("width", divWidth);
}

