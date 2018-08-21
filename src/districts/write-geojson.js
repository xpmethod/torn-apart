import { writeFile } from "fs";
import { readFileSync } from "fs";
import { stdout } from "process";
import path from "path";
import _ from "lodash";
import states from "../states";
import getOrdinalSuffix from "../get-ordinal-suffix";
import slug from "../slug";

export default function(rawDistricts, decorations){
  const geoJSON = JSON.parse(
    readFileSync(path.join("src", "districts", "congressional-districts.geo.json"))
  );
  const districts = rawDistricts.filter(d => d.total_awards > 0);
  stdout.write(`there are ${districts.length} districts.\n`);

  const features = _.map(districts, district => {
    const id2 =  district.id2.length === 3 ? `0${district.id2}` : district.id2;
    const stateFP = id2.substr(0, 2);
    const state = _.find(states, { stateFP }).name;
    const districtNumber = _.toInteger(id2.substr(2));
    const districtName = districtNumber < 1 ? "ta-at-large-district" : `ta-ordinal-${ getOrdinalSuffix(districtNumber) }-m`;
    let party = "republican";
    if(district.party.match(/D/)) party = "democrat";
    if(district.party.match(/N/)) party = "no-rep";
    const profiteer = _(district.awards)
      .uniqBy("duns")
      .map(award_recip => {
        const name = _.find(decorations, { duns: award_recip.duns }).cleanName;
        return {
          name,
          value: _(district.awards)
            .filter({ duns: award_recip.duns })
            .reduce((sum, award) => sum + _.toInteger(award.currentValue), 0)
        };
      })
      .sortBy(["value"])
      .last();

    const feature = {
      type: "Feature"
    };
    feature.geometry = _.filter(geoJSON.features, shape => {
      return shape.properties.GEOID.replace(/^0/, "") === district.id2;
    })[0].geometry;
    feature.properties = {
      state,
      districtNumber,
      districtName,
      party,
      profiteer,
      dom_id: `district-${slug(state)}-${districtNumber}`,
      representative: district.representative.replace(/'/g, "’"),
      representative_photo_url: district.representative_photo_url,
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
