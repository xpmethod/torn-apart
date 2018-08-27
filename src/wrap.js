// from https://bl.ocks.org/mbostock/7555321
import _ from "lodash";
import { select } from "d3-selection";

export default function(text, { width = 40, lineHeight = 1.1 }) {
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
    if (text.attr("data-wrap-width")) {
      width = _.toInteger(text.attr("data-wrap-width"));
    }
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
  });
}
