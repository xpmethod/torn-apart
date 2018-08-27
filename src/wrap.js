// from https://bl.ocks.org/mbostock/7555321
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
      lineNumber = 1,
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");
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
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", lineHeight + dy + "em")
          .text(word);
      }
    }
    if (text.attr("data-wrap-align") === "vertical") {
      text.attr(
        "transform",
        `translate(-9, -${(10 * (lineNumber * lineHeight - dy)) / 2})`
      );
    }
  });
}
