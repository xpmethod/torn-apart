export default function(svg) {
  const name = svg
    .attr("id")
    .replace("d3-", "")
    .replace("-svg", "");
  const defs = svg.append("defs");
  const filter = defs.append("filter").attr("id", `filter-glow-${name}`);
  filter
    .append("feGaussianBlur")
    .attr("stdDeviation", "3.5")
    .attr("result", "coloredBlur");
  const feMerge = filter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "coloredBlur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");
  return svg;
}
