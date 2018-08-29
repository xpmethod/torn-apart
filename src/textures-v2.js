import $ from "jquery";
import updateTexts from "./update-texts";
import spinner from "./spinner";

$.when(
  $.ajax("/torn-apart/assets/markdown/textures_v2_en.md"),
  $.ajax("/torn-apart/assets/markdown/textures_v2_es.md"),
  $.ajax("/torn-apart/assets/markdown/textures_v2_fr.md")
).done((en, es, fr) => {
  // these callbacks come in as an array of three items: string, status, and an object.
  const textures = {};
  [[en, "en"], [es, "es"], [fr, "fr"]].map(data => {
    textures[data[1]] = {};
    let textArr = data[0][0]
      // data[0][0]
      .replace(/\$/g, "🛅")
      // .split("#IMGTAG#")
      .split("#IMGTAG#");
    console.log(data[1], textArr.length, textArr);
    textArr.map((chunk, i) => {
      // .map((chunk, i) => {
      textures[data[1]][`ta-v2-textures-full-text-${i + 1}`] = chunk;
    });
  });
  $.i18n().load(textures);
  updateTexts();
  spinner.stop();
});
