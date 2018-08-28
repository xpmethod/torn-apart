import $ from "jquery";

export default function() {
  const divisor = window.matchMedia("(max-width: 576px)").matches ? 3 : 4;
  const x = $("#rain-size-legend")[0].getBBox().width - 5;
  const y = $("#rain-size-legend")[0].getBBox().height / divisor;
  const lineHeight = 1.1;
  $("#rain-legend-unique").attr(
    "transform",
    `translate(${x},${($("#rain-legend-unique").children().length + 1) *
      lineHeight *
      10 -
      y})`
  );
  $("#rain-legend-renewed").attr(
    "transform",
    `translate(${x},${y})`
    // `translate(${x},${$("#rain-legend-renewed").children().length *
    //   lineHeight *
    //   10})`
  );
}
