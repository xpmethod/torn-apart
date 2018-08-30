import showdown from "showdown";
import footnotes from "showdown-footnotes";
import $ from "jquery";
import { select, selectAll } from "d3-selection";
import wrap from "./wrap";

function currentLocaleToggle(locale) {
  $(".locale-toggle-text").removeClass("active");
  $(`.locale-toggle-${locale}`).addClass("active");
}

export default function(testID, encloserID = "body") {
  if (testID) {
    if (
      $(testID)
        .html()
        .trim() === "" ||
      $(testID)
        .text()
        .trim()
        .match(/^ta-/)
    ) {
      console.log("testID passed, changing encloser", testID, encloserID);
      updateTheTexts(encloserID);
    } else {
      console.log("had testID but skipping updating", testID, encloserID);
      return true;
    }
  } else {
    updateTheTexts(encloserID);
    console.log("had no testID", testID, encloserID);
  }
}

function updateTheTexts(encloserID) {
  console.log("updating the texts.", encloserID);
  const md = new showdown.Converter({ extensions: [footnotes] });
  const externalLinkHTML =
    "<span>&nbsp;<i style='vertical-align: baseline; font-size: 60%;' class='fa fa-small fa-external-link-alt'></i></span>";
  $(encloserID).i18n();
  currentLocaleToggle($.i18n().locale);
  $(".markdownify").html((i, html) => {
    return md.makeHtml(html);
  });
  $(".click-to-hide a").each(function() {
    $(this).attr("onclick", "event.stopPropagation();");
  });
  $("a[href^='http']:not(a:has(img))").html(function(i, html) {
    if (!html.match("fa-external-link-alt")) {
      $(this).append($.parseHTML(externalLinkHTML));
    }
  });
  $("a[href^='http']").attr("target", "_blank");
  selectAll(".wrapped").each(function() {
    select(this).call(wrap, { width: 50 });
    // console.log(
    //   "#####tspans",
    //   select(this)
    //     .selectAll("tspan")
    //     .nodes().length
    // );
  });
  updateTextures();
}

function updateTextures() {
  // if (window.location.pathname.match(/textures/)) {
  $("main.page").html((i, old) => old.replace(/🛅/g, "$"));
  $("p").each(function() {
    if (
      $(this)
        .text()
        .match(/^> /)
    ) {
      $(this)
        .html((i, old) => old.replace(/&gt; /, ""))
        .wrap("<blockquote></blockquote>");
    }
  });
  // }
}
