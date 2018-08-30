import $ from "jquery";
import _ from "lodash";
import { selectAll, select } from "d3-selection";
import wrap from "../wrap";

export default function(circleSizes) {
  const yShift = [...circleSizes].reverse()[0];
  const legendWidth =
    select("#rain-size-legend")
      .node()
      .getBBox().width - 5;
  _.each(
    [{ text: "unique", y: yShift - 30 }, { text: "renewed", y: yShift + 10 }],
    ({ text, y }) => {
      select("#rain-size-legend")
        .select("g")
        .append("text")
        .attr("x", legendWidth)
        .attr("y", y)
        // this causes the three-long text to become two rows only.
        .classed("rain-legend-extras", true)
        .classed("wrapped", true)
        .attr("id", `rain-legend-${text}`)
        .attr("data-i18n", `ta-${text}-contracts`)
        .attr("data-wrap-align", "vertical")
        .attr("data-wrap-width", 50)
        .attr("dy", "0.01")
        .text($.i18n(`ta-${text}-contracts`));
    }
  );

  selectAll(".rain-legend-extras").call(wrap, { width: 50 });
}
