import { sum } from "d3-array";
import Data from "../../data/iceFacs.csv";
import facOperators from "./private-operators.json";

export default function(operators){
  // Define our colors...
  const fadedgreen = "rgba(102, 194, 165, 0.9)";
  const fadedorange = "rgba(252, 141, 98, 0.9)";
  const fadedpurple = "rgba(141, 160, 203, 0.9)";
  const fadedpink = "rgba(231, 138, 195, 0.9)";
  const fadedblack = "rgba(51, 51, 51, 0.9)";

  // data here is a five-part array. Government and Other private are created
  // when operators is defined. These are the three remaining, so we need to
  // add them to operators.data.
  ["GEO", "CCA", "ORR"].forEach( code => {
    // Find the operator info from facOperators.
    const operator = facOperators.filter(o => o.code === code)[0];
    operators.data.push({
      group: code,
      name: operator.name,
      url: operator.url,
      facilityCount: Data.filter(f => f["Facility.Operator"] === code).length,
      adpCount: sum(Data.filter(f => f["Facility.Operator"] === code).map(d => +d["FY18.ADP"]))
    });
  });
  // These operator codes, together, make up "Other private," so we need to consolidate their values and push them into the already existing first value of opearators.data.
  ["AHTNA (GUARD)", "M&TC", "ICA", "LASALLE CORRECTIONS", "AGS", "AKAL", "CEC", "MVM"].forEach( code => {
    operators.data[0].facilityCount += Data.filter(f => f["Facility.Operator"] === code).length;
    operators.data[0].adpCount += sum(Data.filter(f => f["Facility.Operator"] === code).map(d => +d["FY18.ADP"]));
  });
  // Now fill in facilityCount and adpCount for the Government object in the data array.
  operators.data[1].facilityCount = Data.filter(d => +d["FY18.ADP"] > 0).length - sum(operators.data.map(d => +d.facilityCount));
  operators.data[1].adpCount = sum(Data.map(d => +d["FY18.ADP"])) - sum(operators.data.map(d => +d.facilityCount));
  // Finally, associate a color with each of the five data objects in operators.data.
  [fadedpink, fadedgreen, fadedorange, fadedpurple, fadedblack].forEach((color, i) => {
    operators.data[i].color = color;
  });
}
