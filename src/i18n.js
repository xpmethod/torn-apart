import $ from "jquery";
import en from "./i18n/en.json";
import es from "./i18n/es.json";
import fr from "./i18n/fr.json";

$.i18n().load({
  "@metadata": {
    "authors": [
      "Manan Ahmed",
      "Alex Gil",
      "Moacir P. de Sá Pereira",
      "Paola Verhaert"
    ],
    "locale": "en"
  },
  en,
  es,
  fr
});
