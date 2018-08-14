import { legendColor } from "d3-svg-legend";
import $ from "jquery";
import { min, max } from "d3-array";
import _ from "lodash";
import { moveLegend, bigMoneyFormat } from "../utils";
import updateTexts from "../update-texts";
import { orange, purple, green, pink } from "../constants";

export default function(){
  const size = 20;
  $("#legend").show().html(() => {
    const html = ["<div class='px-3 py-2'><div><p data-i18n='ta-murderboard-legend-title'></p></div><div class='d-flex'>"];// <div class='d-flex justify-content-between'>"];
   
      html.push(`<div class="row"><div class = "col-md-1">
        <svg class="legend-svg" height="${3 * size}" width="${6 * size}">
          <rect height="${size}" width="${size}" class="legend-polygon" fill="${purple}" />
          <rect height="${size}" width="${size}" class="legend-polygon" fill="${green}" transform="translate(0,${2 *size})"/>
		   </svg></div>
        `
		);
		 
		  html.push("<div class ='col-md-5'><p class='axis' data-i18n='ta-parent-company'></p><p>&nbsp;</p><p class='axis' data-i18n='ta-product'></p></div>");
		  
		   html.push(`<div class = "col-md-1"><svg class="legend-svg" height="${3 * size}" width="${6 * size}">
          <rect height="${size}" width="${size}" class="legend-polygon" fill="${orange}" transform="translate(0,${2 * size})"/>
		   <rect height="${size}" width="${size}" class="legend-polygon" fill="${pink}"/>
        </svg>
        </div>`);
 
    html.push("<div class='col-md-5'><p class='axis' data-i18n='ta-company'></p><p>&nbsp;</p><p class='axis' data-i18n='ta-product-category'></p></div><div>&nbsp;</div></div></div>");
 //   html.push("</div></div>");
     console.log(html.join(""));
    return html.join("\n");
  });
  updateTexts();
  moveLegend();
  
  // const divWidth = Math.floor($(".legend-svg-div").width());
 // $(".legend-svg").attr("width", function(){
 //   const width = $(this).parent().width();
//    $(this).children().attr("width", width);
 //   return width;
 // });
  // $(".legend-polygon").attr("width", divWidth);
}

/*		 
  return legendColor()
    .title("PostIts")
    .labels(["Product Category", "Product", "Subsidiary Contractor", "Contractor"])
    .shape("rect")
    .shapeWidth(50)
    .shapePadding(10)
    .scale(scale);
	*/

