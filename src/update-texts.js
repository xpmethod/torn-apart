import showdown from "showdown";
import footnotes from "showdown-footnotes";
import $ from "jquery";
import { selectAll } from "d3-selection";
import wrap from "./wrap";

function currentLocaleToggle(locale) {
  $(".locale-toggle-text").removeClass("active");
  $(`.locale-toggle-${locale}`).addClass("active");
}

export default function() {
  const md = new showdown.Converter({ extensions: [footnotes] });
  const externalLinkHTML =
    "<span>&nbsp;<i style='vertical-align: baseline; font-size: 60%;' class='fa fa-small fa-external-link-alt'></i></span>";
  $("body").i18n();
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
  selectAll(".wrapped").call(wrap, { width: 50 });
}
