import stringify from "csv-stringify";
import path from "path";
import { writeFile } from "fs";
import { stdout } from "process";

export default function(districts){
  stringify(districts, 
    { header: true,
      columns: [
        "id",
        "id2",
        "display_label",
        "party",
        "district_url",
        "representative",
        "representative_photo_url",
        "population",
        "population_moe",
        "households",
        "households_moe",
        "median_income_hh",
        "median_income_hh_moe",
        "fy13",
        "fy14",
        "fy15",
        "fy16",
        "fy17",
        "fy18",
        "total_awards"
      ]
    },
    (err, output) => {
      writeFile(path.join("data", "districts", "fat_districts.csv"), output, (err) => {
        if(err) throw err;
        stdout.write("WE DID THE CSV 🚀\n");
      }); // close writeFile callback.
    });
}
