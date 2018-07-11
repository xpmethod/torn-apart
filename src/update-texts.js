import markdownit from "markdown-it";
import markdownitFootnote from "markdown-it-footnote";
import $ from "jquery";

function currentLocaleToggle(locale){
  $(".locale-toggle-text").removeClass("active");
  $(`.locale-toggle-${locale}`).addClass("active");
}

export default function() {
  const md = markdownit({html: true}).use(markdownitFootnote);
  const externalLinkHTML = "<span>&nbsp;<i style='vertical-align: baseline; font-size: 60%;' class='fa fa-small fa-external-link-alt'></i></span>";
  // const q = d3.queue();
  // q.defer(callback => {$("body").i18n(); callback(null);});
  $("body").i18n();
  // q.await(function(e){
  //   if (e) throw e;
    currentLocaleToggle($.i18n().locale);
    $(".markdownify").html((i, html) => {
      return md.render(html);
    });
    $(".click-to-hide a").each(function() {
      $( this ).attr("onclick", "event.stopPropagation();");
    });
    $("a[href^='http']:not(a:has(img))").html(function(i, html){
      if(!html.match("fa-external-link-alt")){
        $( this ).append($.parseHTML(externalLinkHTML));
      }
    });
    $("a[href^='http']").attr("target", "_blank");
  // });
}
