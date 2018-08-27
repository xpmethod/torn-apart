import _ from "lodash";
import { selectAll, select } from "d3-selection";
import wrap from "../wrap";
import { rem } from "../constants";

export default function() {
  const treeG = select("#treemap-g");
  _.each(
    [
      {
        className: "theflowofbodiesandgoods",
        text: "The Flow of Bodies and Goods"
      },
      { className: "banality", text: "Banality" },
      { className: "surveillance", text: "Surveillance" },
      { className: "thethreatofviolence", text: "The Threat of Violence" },
      // {className: "formingbodies", text: "Forming Bodies"},
      { className: "moldingbodies", text: "Molding Bodies" }
    ],
    category => {
      const box = bBoxUnion("g." + category.className);
      box.width = box.botX - box.topX;
      box.height = box.botY - box.topY;
      const text = treeG
        .append("text")
        .text(category.text)
        .attr("dy", "0.01")
        .style("text-anchor", "middle")
        .style("fill", "#666")
        .attr("x", box.topX + box.width / 2)
        .attr("y", box.topY + box.height / 2)
        .style("pointer-events", "none")
        .style("font-weight", "bold")
        .style("font-size", 2 * rem + "px");
      text.call(wrap, { width: 0.95 * box.width });
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
