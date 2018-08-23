// import { fileOpenCSV, fileWriteCSV } from "./file-utils";
import _ from "lodash";
import { fileWriteCSV } from "./file-utils";
// import mungeMatrix from "./wcs/munge-matrix";
import { resolve, join } from "path";
import { stdout } from "process";
import { featureEach } from "@turf/meta";
import { point, polygon } from "@turf/helpers";
import rhumbDestination from "@turf/rhumb-destination";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import Data from "../data/wcs/lines.geo.json";
import lower48 from "./wcs/usa-outline-one-shape.geo.json";
import Alaska from "./wcs/alaska.geo.json";

const usa = polygon(lower48.features[0].geometry.coordinates);
const alaska = polygon(Alaska.features[0].geometry.coordinates);

const factor = 10;

const points = [];
featureEach(Data, feature => {
  let hits = [];
  for (let d = -180; d <= 180; d = d + factor) {
    const pt = point(feature.geometry.coordinates);
    const destination = rhumbDestination(pt, 500, d);
    if (booleanPointInPolygon(destination, usa)) {
      hits.push(bearingToX(d) / factor);
    }
  }
  if (hits.length === 0) {
    // stdout.write(`\nNo initial hit for ${feature.properties.name}: `);
    // try again at 750 km.
    for (let d = -180; d <= 180; d = d + factor) {
      const pt = point(feature.geometry.coordinates);
      const destination = rhumbDestination(pt, 750, d);
      if (booleanPointInPolygon(destination, usa)) {
        hits.push(bearingToX(d) / factor);
      }
    }
    if (hits.length === 0) {
      // stdout.write(" now trying alaska ");
      // try alaska.
      for (let d = -180; d <= 180; d = d + factor) {
        const pt = point(feature.geometry.coordinates);
        const destination = rhumbDestination(pt, 750, d);
        if (booleanPointInPolygon(destination, alaska)) {
          hits.push(bearingToX(d) / factor);
        }
      }
      if (hits.length === 0) {
        // stdout.write("punting");
        //punt
        points.push({
          name: feature.properties.name,
          minAngle: 0,
          maxAngle: 0
        });
      }
    }
  }
  // now.
  if (hits.length > 0) {
    hits = _.uniq(hits.sort((a, b) => a - b));
    if (hits[0] === 0 && hits[hits.length - 1] === 35) {
      // friends.
      const length = hits.length;
      for (let i = 0; i < length; i = i + 1) {
        if (hits[i] === i) {
          hits.push(36 + i);
        } else {
          break;
        }
      }
    }
    const strings = [];
    hits.forEach((hit, i) => {
      const thisString = [];
      for (let j = i; j >= 0; j = j - 1) {
        if (hits[j] - hits[j - 1] === 1) {
          thisString.push(hits[j]);
        }
      }
      if (hits[1] - hits[0] === 1) {
        thisString.push(hits[0]);
      }
      if (hits[2] - hits[1] === 1) {
        thisString.push(hits[1]);
      }
      strings.push(thisString);
    });
    let max = -1;
    let index = -1;
    strings.forEach((a, i) => {
      if (a.length > max) {
        max = a.length;
        index = i;
      }
    });
    let sortedHits = _.uniq(strings[index].sort((a, b) => a - b));
    // ["Alexandria Bay", "Wellesley Island", "Thousand Island Bridge", "Ogdensburg", "Massena", "Montreal Canada"].forEach(target => {
    //   if(target === feature.properties.name){
    //     stdout.write(target);
    //     stdout.write(JSON.stringify(hits));
    //     stdout.write("\n");
    //     stdout.write(JSON.stringify(sortedHits));
    //     stdout.write("\n");
    //   }
    // });
    if (sortedHits[0] === 0 && sortedHits[sortedHits.length - 1] > 35) {
      sortedHits = sortedHits.splice(
        sortedHits[sortedHits.length - 1] - 35,
        sortedHits.length
      );
    }
    [
      "Alexandria Bay",
      "Wellesley Island",
      "Thousand Island Bridge",
      "Ogdensburg",
      "Massena",
      "Montreal Canada"
    ].forEach(target => {
      if (target === feature.properties.name) {
        // stdout.write(JSON.stringify(sortedHits));
        // stdout.write("\n");
        sortedHits = sortedHits.filter(hit => hit > 4);
        stdout.write(target);
        stdout.write(JSON.stringify(sortedHits));
        stdout.write("\n");
      }
    });
    let minAngle = sortedHits[0] * factor;
    let maxAngle = sortedHits[sortedHits.length - 1] * factor;

    points.push({
      name: feature.properties.name,
      minAngle,
      maxAngle,
      avgAngle: (maxAngle - minAngle) / 2
    });
  }
});

const dataPath = resolve("data", "wcs");
fileWriteCSV(join(dataPath, "lines-with-angles.csv"), points);
//
//
//
// const data = fileOpenCSV(join(dataPath, "city-removals-dirty.csv"));
// const cleanData = mungeMatrix(data);
// fileWriteCSV(join(dataPath, "city-removals-clean.csv"), cleanData);
// console.log(data);
// console.log(JSON.stringify(cleanData, null, 2));

function bearingToX(bearing) {
  if (bearing > 90) {
    return 270 + (180 - bearing);
  } else if (bearing >= 0) {
    return 90 - bearing;
  } else if (bearing < 0) {
    return -1 * (bearing - 90);
  }
}
