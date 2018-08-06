import _ from "lodash";

export default function(d) {

  const html = [`<h3>${d.name}</h3>`];

  _.each([
    { title: "Doing business as", column: "recipient_name" },
    { title: "Product categories", column: "naics_cat" },
  ], row => {
    html.push(`<p><strong>${row.title}:</strong> ${_(d.awards)
      .map(award => award[row.column])
      .uniq()
      .join(", ")}</p>`);
  });
  
  html.push(JSON.stringify(d.awards));



  return html.join("\n");

}
