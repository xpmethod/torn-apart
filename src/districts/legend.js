import $ from "jquery";
import { min, max } from "d3-array";
import _ from "lodash";
import { moveLegend, bigMoneyFormat } from "../utils";
import updateTexts from "../update-texts";
import { orange, purple, green, opacityRange5 } from "../constants";

export default function(bins){
  const height = 20;
  $("#legend").show().html(() => {
    const html = ["<div class='px-3 py-2'><div class='d-flex'>"];// <div class='d-flex justify-content-between'>"];
    const breaks = _.map(bins, (bin, i, array) => {
      if(i < array.length - 1){
        const least = max(bin);
        const most = min(array[i + 1]);
        return { max: (most - least) / 2 };
      } else {
        return { max: max(bin) };
      }
    });
    _.each(breaks, (bk, i, array) => {
      if( i < array.length -1 ){
        array[i + 1].min = bk.max;
      } else {
        breaks.push({min: bk.max});
      }
    });
    _.each(breaks, (bk, i) => {
      let legend;
      if(bk.min && bk.max) {
        legend = `$${bigMoneyFormat(bk.min)} – $${bigMoneyFormat(bk.max)}`;
      } else if (bk.min) {
        legend = `> $${bigMoneyFormat(bk.min)}`;
      } else {
        legend = `< $${bigMoneyFormat(bk.max)}`;
      }
      html.push(`<div class="flex-fill"><div class="legend-svg-div">
        <svg class="legend-svg" height="${3 * height}" width="20">
          <rect height="${height}" width="20" class="legend-polygon" fill="${purple}" opacity="${opacityRange5[i]}"/>
          <rect height="${height}" width="20" class="legend-polygon" fill="${green}" opacity="${opacityRange5[i]}" transform="translate(0,${height})"/>
          <rect height="${height}" width="20" class="legend-polygon" fill="${orange}" opacity="${opacityRange5[i]}" transform="translate(0,${2 * height})"/>
        </svg>
        </div>
        <div>
          <p>
            ${legend}
          </p>
        </div>
        </div>`);
    });
    html.push("<div class='flex-fill'><div class='legend-svg-div'><p class='axis' data-i18n='ta-republican-cong'></p><p class='axis' data-i18n='ta-democrat-cong'></p><p class='axis' data-i18n='ta-no-rep-cong'></p></div><div><p data-i18n='ta-ice-money-since-2013'></p></div>");
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

