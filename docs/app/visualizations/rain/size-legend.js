// import L from "leaflet";
import { legendSize } from "d3-svg-legend";

export default function(scale) {
  return (
    legendSize()
      .title("Contract Value and Type")
      .scale(scale)
      .shape("circle")
      .shapePadding(35)
      .labels(customLabels)
      .labelDelimiter("–")
      .labelOffset(20)
      .labelWrap(50)
      // .locale("en-US")
      .labelFormat("$.2s")
      .orient("horizontal")
  );
}

function customLabels({ i, genLength, generatedLabels, labelDelimiter }) {
  if (i === 0) {
    const values = generatedLabels[i].split(` ${labelDelimiter} `);
    return `< ${values[1]}`;
  } else if (i === genLength - 1) {
    const values = generatedLabels[i].split(` ${labelDelimiter} `);
    return `> ${values[0]}`;
  }
  return generatedLabels[i];
}
