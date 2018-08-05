// import $ from "jquery";
import _ from "lodash";
import { sum } from "d3-array";
import { select } from "d3-selection";
import { interpolateRgb } from "d3-interpolate";
import { schemeSet2 } from "d3-scale-chromatic";
import { scaleOrdinal } from "d3-scale";
import { format } from "d3-format";
import { hierarchy, treemap, treemapResquarify } from "d3-hierarchy";
import Data from "../../data/explorer/graph.json";
// import { rem } from "../constants";

export default function(){
  const data = _.cloneDeep(Data);
  // const width = $(window).width() - 4 * rem;
  // const height = 350;
  // const height = $("#v2-div").position().top + $("#v2-div").height() - $("#explorer-svg").position().top;
  const svg = select("#explorer-svg");
  // .attr("width", width)
  // .attr("height", height);
  const g = svg.append("g").attr("id", "treemap-g");
  const fader = (color => interpolateRgb(color, "#fff")(0.2));
  const color = scaleOrdinal(schemeSet2.map(fader));
  const theFormat = format(",d");

  const theTree = treemap()
    .tile(treemapResquarify)
    .size([svg.attr("width"), svg.attr("height")])
    .round(true)
    .paddingInner(1);

  const theData = { name: "contracts",
    children: _(data.nodes)
      .filter(node => node.category === "product category")
      .map(node => { return { name: node.name};})
      .each(productCat => {
        productCat.children = _(data.nodes)
          .filter(node => node.child_of === productCat.name)
          .map(node => { return { name: node.name }; })
          .each(node => {
            node.children = _(data.links)
              .filter(link => link.target === node.name && link.value > 0)
              .value()
              .map(link => { return { name: link.source, contract_value: link.value };});
          });
      })
  };

  // check Retail. It should have "Tools" and "Books"
  // console.log(theData);

  const root = hierarchy(theData)
    .eachBefore(d =>  d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name)
    .sum(d => d.contract_value)
    .sort((a, b) => b.height - a.height || b.value - a.value);
      
  theTree(root);

  const cell = g.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
    .attr("transform", d => `translate(${ d.x0 },${ d.y0 })`);

  cell.append("rect")
    .attr("id", d => d.data.id)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => color(d.parent.data.id));
  // .attr("fill", d => { console.log(d); return color(d.parent.data.id);});

  cell.append("title")
    .text(d => `${ d.data.id.replace("contracts.", "").replace(".", " ") }\n
      $${ theFormat(d.value)}`);

  treemap(root.sum(sum));

}
