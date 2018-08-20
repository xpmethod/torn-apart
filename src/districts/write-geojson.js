import { writeFile } from "fs";
import { readFileSync } from "fs";
import { stdout } from "process";
import path from "path";
import _ from "lodash";

export default function(rawDistricts){
  const geoJSON = JSON.parse(
    readFileSync(path.join("src", "districts", "congressional-districts.geo.json"))
  );
  const districts = rawDistricts.filter(d => d.total_awards > 0);
  stdout.write(`there are ${districts.length} districts.\n`);

  const features = _.map(districts, district => {
    const feature = {
      type: "Feature"
    };
    feature.geometry = _.filter(geoJSON.features, shape => {
      return shape.properties.GEOID.replace(/^0/, "") === district.id2;
    })[0].geometry;
    feature.properties = {
      display_label: district.display_label,
      party: district.party,
      representative: district.representative,
      representative_photo_url: district.representative_photo_url,
      fy13: district.fy13,
      fy14: district.fy14,
      fy15: district.fy15,
      fy16: district.fy16,
      fy17: district.fy17,
      fy18: district.fy18,
      awards: district.awards,
      total_value: district.total_awards,
      district_url: district.district_url,
    };
    return feature;
  });
  writeFile(path.join("data", "districts", "fat_districts.geo.json"), 
    JSON.stringify({ type: "FeatureCollection", features }, null, 2), (err) => {
      if(err) throw err;
      stdout.write("WE DID THE GEOJSON 🌎\n");
    });
}
