import _ from "lodash";
import { selectAll, select } from "d3-selection";
import wrap from "../wrap";
import { rem } from "../constants";

export default function() {
  const treeG = select("#treemap-g");
  _.each(
    [
      {
        className: "the-flow-of-bodies-and-goods",
        text: "The Flow of Bodies and Goods"
      },
      { className: "staples", text: "Staples" },
      { className: "surveillance", text: "Surveillance" },
      { className: "the-threat-of-violence", text: "The Threat of Violence" },
      { className: "reforming-bodies", text: "Reforming Bodies" },
      { className: "walls", text: "Walls" },
      { className: "machines", text: "Machines" },
      { className: "mixed-bag", text: "Mixed Bag" },
      { className: "doctrine", text: "Doctrine" }
      // { className: "moldingbodies", text: "Molding Bodies" }
    ],
    category => {
      const box = bBoxUnion("g." + category.className);
      box.width = box.botX - box.topX;
      box.height = box.botY - box.topY;
      const text = treeG
        .append("text")
        .text(category.text)
        .classed("wrapped", true)
        .attr("data-wrap-width", 0.95 * box.width)
        .attr("data-i18n", `ta-v2-${category.className}`)
        .attr("dy", "0.01")
        .style("text-anchor", "middle")
        .style("fill", "#666")
        .style("opacity", 0.4)
        .attr("x", box.topX + box.width / 2)
        .attr("y", box.topY + box.height / 2)
        .style("pointer-events", "none")
        .style("font-weight", "bold")
        .style("font-size", 2 * rem + "px");
      text.call(wrap, { height: box.height / 2, width: 0.95 * box.width });
      text.selectAll("tspan").attr("x", text.attr("x"));
    }
  );
}

// adapted from https://gist.github.com/jordanstephens/af0d106731f56ef3ac0d
function bBoxUnion(selector) {
  var nodeList = selectAll(selector).nodes(),
    nodeArray = Array.prototype.slice.call(nodeList);

  return nodeArray.reduce(
    function(memo, node) {
      if (node.getBBox) {
        var bBox = node.getBBox();
        const [xOff, yOff] = node
          .getAttribute("transform")
          .match(/(\d*),(\d*)/)
          .splice(1, 2);
        memo.topX = Math.min(memo.topX, +xOff);
        memo.topY = Math.min(memo.topY, +yOff);
        memo.botX = Math.max(memo.botX, +xOff + bBox.width);
        memo.botY = Math.max(memo.botY, +yOff + bBox.height);
      }
      return memo;
    },
    { topX: 100000, topY: 100000, botX: 0, botY: 0 }
  );
}
