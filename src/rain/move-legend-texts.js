import $ from "jquery";

export default function() {
  const x = $("#rain-size-legend")[0].getBBox().width - 5;
  const lineHeight = 1.1;
  $("#rain-legend-unique").attr(
    "transform",
    `translate(${x},-${($("#rain-legend-unique").children().length + 1) *
      lineHeight *
      10})`
  );
  $("#rain-legend-renewed").attr(
    "transform",
    `translate(${x},0)`
    // `translate(${x},${$("#rain-legend-renewed").children().length *
    //   lineHeight *
    //   10})`
  );
}
