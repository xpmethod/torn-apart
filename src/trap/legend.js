import $ from "jquery";
import updateTexts from "../update-texts";
import { moveLegend } from "../utils";

export default function() {
  $("#legend").html(
    "<div class='px-3 py-2'><svg class='float-left' height='40' width='50'><rect width='50' height='40' class='orange-polygon' /></svg><span data-i18n='ta-v1-trap-legend' class='markdownify'></span></div>"
  );
  updateTexts();
  moveLegend();
  $("#legend").show();
}
