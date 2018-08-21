import $ from "jquery";
import nightingaleInit from "./nightingale/init";
import spinner from "./spinner";

spinner.stop();
$("#nav-reflections").addClass("active");
$(".redacted").html((i, html) => html.split(" ").map(text => `<span class="redacted-span">${text}</span>`).join(" "));
$(".footnotes").prepend("<hr><h2 class='footnotes-header'>Footnotes</h2>");
$(".footnotes ol li p").html((i, html) => html.replace("↩", "<i class='fa fa-undo'></i>"));

if($("#batwing-div").length > 0){
  nightingaleInit();
}
