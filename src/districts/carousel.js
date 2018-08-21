import _ from "lodash";
import congressionalDistricts from "../../data/districts/fat_districts.geo.json";

export default function(){
  const top15 = _(congressionalDistricts.features)
    .map(district => {
      return { 
        dom_id: district.properties.dom_id,
        value: district.properties.total_value
      };
    });
  return top15;
}
