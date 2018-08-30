// from https://bl.ocks.org/mbostock/7555321
import _ from "lodash";
import { select } from "d3-selection";

export default function(text, { height = 1000, width = 40, lineHeight = 1.1 }) {
  text.each(function() {
    var text = select(this),
      words = text
        .text()
        .replace(/-/g, "- ")
        .split(/\s+/)
        .reverse(),
      word,
      line = [],
      lineNumber = 0,
      x = text.attr("x") || 0,
      y = text.attr("y") || 0,
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");
    if (text.attr("data-wrap-height")) {
      height = _.toInteger(text.attr("data-wrap-height"));
    }
    if (text.attr("data-wrap-width")) {
      width = _.toInteger(text.attr("data-wrap-width"));
    }
    // console.log("in wrap", text.text(), height, width);
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        lineNumber = lineNumber + 1;
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
    if (text.attr("data-wrap-align") === "vertical") {
      text.attr(
        "transform",
        `translate(0, -${(10 * (lineNumber * lineHeight - dy)) / 2})`
      );
    }
    // console.log("pre while", text.text()); //, text.node());
    while (text.node().getBBox().height > height) {
      // console.log("reducing height", lineNumber + 1, text.text());
      text.style("font-size", parseInt(text.style("font-size")) - 2 + "px");
    }
    while (text.node().getBBox().width > width) {
      // console.log("reducing width", lineNumber + 1, text.text());
      text.style("font-size", parseInt(text.style("font-size")) - 2 + "px");
    }
    if (parseInt(text.style("font-size")) < 6) {
      text.style("opacity", 0);
    }
    // console.log("post while", text.text()); //, text.node());
  });
}
