import $ from "jquery";
import updateTexts from "./update-texts";
import spinner from "./spinner";

$.when(
  $.ajax( "/torn-apart/assets/markdown/textures_v2_en.md" ),
  $.ajax( "/torn-apart/assets/markdown/textures_v2_es.md" ),
  $.ajax( "/torn-apart/assets/markdown/textures_v2_fr.md" )
).done( (en, es, fr) => {
  // these callbacks come in as an array of three items: string, status, and an object.
  const textures = {};
  [[en, "en"], [es, "es"], [fr, "fr"]].map((data) => {
    textures[data[1]] = {};
    data[0][0].split("#IMGTAG#").map( (chunk, i) => {
      textures[data[1]][`ta-v2-textures-full-text-${i + 1}`] = chunk;
    });
  });
  $.i18n().load(textures);      
  updateTexts();
  spinner.stop();
});
