import { writeFile } from "fs";
import { readFileSync } from "fs";
import { stdout } from "process";
import path from "path";
import _ from "lodash";

export default function(districts){
  const geoJSON = JSON.parse(
    readFileSync(path.join("src", "districts", "congressional-districts.geo.json"))
  );
  _.each(geoJSON.features, shape => {
    const district = _.find(districts, { id2: shape.properties.GEOID.replace(/^0/, "") });
    if(district){
      shape.properties.display_label = district.display_label;
      shape.properties.party = district.party;
      shape.properties.representative = district.representative;
      shape.properties.representative_photo_url = district.representative_photo_url;
      shape.properties.fy13 = district.fy13;
      shape.properties.fy14 = district.fy14;
      shape.properties.fy15 = district.fy15;
      shape.properties.fy16 = district.fy16;
      shape.properties.fy17 = district.fy17;
      shape.properties.fy18 = district.fy18;
      shape.properties.awards = district.awards;
      shape.properties.total_awards = district.total_awards;
      shape.properties.district_url = district.district_url;
    } else {
      stdout.write(`Could not find ${shape.properties.GEOID}\n`);
    }
  });
  writeFile(path.join("data", "districts", "fat_districts.geo.json"), 
    JSON.stringify(geoJSON, null, 2), (err) => {
      if(err) throw err;
      stdout.write("WE DID THE GEOJSON 🌎\n");
    });
}
