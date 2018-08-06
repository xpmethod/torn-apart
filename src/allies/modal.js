import $ from "jquery";
import _ from "lodash";
import allyDirectoryEntry from "./directory-entry";
import Data from "./list.csv";

export default function() {

  $("#modal-title").attr("data-i18n", "ta-allies-directory-title");
  const html = ["<p data-i18n='ta-allies-curated-list'></p>"];
  _.each(["International", "México", "United States"], country => {
    html.push(`<h2 data-i18n="ta-${_.chain(country).toLower().deburr().value()}"></h2>`);
    html.push("<ul>");
    _(Data).filter({ country })
      .each(ally => html.push(`<li>${allyDirectoryEntry(ally)}</li>`));
    html.push("</ul>");
    $("#modal-content").html(html.join("\n"));
  });

}

