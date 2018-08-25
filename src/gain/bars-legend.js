import { symbol, symbolSquare } from "d3-shape";
import { legendColor } from "d3-svg-legend";

export default function(g, z) {
  g.append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(200,10)")
    .call(
      legendColor()
        .shape(
          "path",
          symbol()
            .type(symbolSquare)
            .size(100)()
        )
        .shapePadding(8)
        .labelWrap(150)
        .labels([
          "Black",
          "Hispanic",
          "South-Asian / Asian / Indian",
          "Asian Pacific",
          "Native-American",
          "Other minority",
          "Native Alaskan",
          "Woman without additional racial or ethnic designation"
        ])
        .scale(z)
    );

  g.selectAll(".y-axis")
    .selectAll("text")
    .style("text-anchor", "middle")
    .attr("x", 0)
    .attr("transform", "translate(-10,0)rotate(-90)");
}
