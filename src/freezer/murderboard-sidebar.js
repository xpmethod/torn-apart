import { select } from "d3-selection";
import murderboardFillInSidebar from "./murderboard-fill-in-sidebar";
import updateTexts from "../update-texts";
//import murderboardLegend from "./murderboard-legend";
export default function(d) {
  // murderboardLegend();

  let html;
  switch (d.category) {
    case "product":
      html = murderboardFillInSidebar(d);
      break;
    case "product category":
      html = murderboardFillInSidebar(d);
      break;
    case "company":
      html = murderboardFillInSidebar(d);
      break;
    case "parent company":
      html = murderboardFillInSidebar(d);
      break;
  }

  select("#freezer-sidebar").html(html);
  updateTexts();
}
