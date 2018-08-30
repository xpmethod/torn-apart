import $ from "jquery";
import _ from "lodash";
import { sum } from "d3-array";
import { select } from "d3-selection";
import { interpolateRgb } from "d3-interpolate";
import { schemeSet2 } from "d3-scale-chromatic";
import { scaleOrdinal } from "d3-scale";
import { hierarchy, treemap, treemapResquarify } from "d3-hierarchy";
import { bigMoneyFormat, slug } from "../utils";
import treeSidebar from "./tree-sidebar";
import treeText from "./tree-text";
import treeSelectCell from "./tree-select-cell";
import Data from "../../data/freezer/graph.json";

export default function() {
  const colorFade = 0.5;
  const data = _.cloneDeep(Data);
  treeSidebar(data);
  const svg = select("#freezer-svg");
  if (!$("#treemap-g").length) {
    const g = svg.append("g").attr("id", "treemap-g");
    const fader = color => interpolateRgb(color, "#fff")(colorFade);
    const fillColor = scaleOrdinal(schemeSet2.map(fader));
    const highlightColor = scaleOrdinal(schemeSet2);

    const theTree = treemap()
      .tile(treemapResquarify)
      // .size([500, 500])
      .size([svg.attr("width"), svg.attr("height")])
      .round(true)
      .paddingInner(1);

    const theData = {
      name: "contracts",
      children: _(data.nodes)
        .filter(node => node.category === "product category")
        .map(node => {
          return { name: node.name };
        })
        .each(productCat => {
          productCat.children = _(data.nodes)
            .filter(node => node.childOf === productCat.name)
            .map(node => {
              return { name: node.name, graphID: node.id };
            })
            .each(node => {
              node.children = _(data.links)
                .filter(
                  link =>
                    link.target === node.graphID && link.contract_value > 0
                )
                .value()
                .map(link => {
                  const node = _.find(data.nodes, { id: link.source });
                  const parent = () => (node.childOf ? node.childOf : node.id);
                  return {
                    name: node.name,
                    parentSlug: slug(parent()),
                    graphID: link.source,
                    contract_value: link.contract_value
                  };
                });
            });
        })
    };

    const root = hierarchy(theData)
      .eachBefore(
        d =>
          (d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name)
      )
      .sum(d => d.contract_value)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    theTree(root);

    const cell = g
      .append("g")
      .attr("id", "tree-leaves")
      .selectAll("g")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr(
        "class",
        d =>
          `parent-${slug(d.data.parentSlug)} ${_.toLower(
            d.parent.parent.data.name
          ).replace(/ /g, "-")}`
      )
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    cell
      .append("rect")
      // .each(d => console.log(d))
      .attr("id", d => slug(d.data.graphID))
      .each(d => {
        d.color = fillColor(d.parent.parent.data.id);
        d.highlightColor = highlightColor(d.parent.parent.data.id);
      })
      .attr(
        "class",
        d =>
          `parent-${slug(d.data.parentSlug)} ${_.toLower(
            d.parent.parent.data.name
          ).replace(/ /g, "-")}`
      )
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .on("click", treeSelectCell)
      .attr("fill", d => d.color);

    cell.append("title").text(d => {
      const [category, description, ...company] = d.data.id
        .split(".")
        .splice(1);
      return `${category}
  ↳ ${description}
    ↳ ${company.join(".")}, $${bigMoneyFormat(d.value)}`;
    });

    treemap(root.sum(sum));
    treeText();
  }
}
