import $ from "jquery";
import Messages from "./i18n/en-es-fr.json";
import updateTexts from "./update-texts";
import { moveLegend } from "./utils";
import spinner from "./spinner";

// start the spinner
spinner.start();

// load in the i18n files.
Messages["@metadata"] = {
  "authors": [
    "Manan Ahmed",
    "Alex Gil",
    "Moacir P. de Sá Pereira",
    "Paola Verhaert",
    "Sylvia Fernández",
    "Clément Lévy"
  ],
  "locale": "en"
};
$.i18n().load(Messages);

// set the locale.
const locales = navigator.languages.filter( i => i.match(/(en|fr|es)/) ).map( i => i.replace(/-.*/, ""));
if (locales.length === 0){
  $.i18n().locale = "en";
} else {
  $.i18n().locale = locales[0];
}
updateTexts();

// listen to the .locale-button for clicks.
$(".locale-button").click(function(e){
  e.preventDefault();
  $(".locale-button").removeClass("active");
  $( this ).addClass("active");
  $.i18n().locale = $(this).data("locale");
  updateTexts();
});

// listen to the .locale-toggle for clicks.
$(".locale-toggle").click(function(e){
  e.preventDefault();
  const langs = ["en", "es", "fr"];
  let index = langs.indexOf($.i18n().locale);
  index === langs.length - 1 ? index = 0 : index = index + 1;
  $.i18n().locale = langs[index];
  updateTexts();
  moveLegend();
});

