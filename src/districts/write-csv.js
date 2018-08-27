import stringify from "csv-stringify";
import path from "path";
import { writeFile } from "fs";
import { stdout } from "process";

export default function(districts) {
  stringify(
    districts,
    {
      header: true,
      columns: [
        "id",
        "id2",
        "state",
        "districtNumber",
        "districtName",
        "party",
        "district_url",
        "representative",
        "representative_photo_url",
        "total_awards"
      ]
    },
    (err, output) => {
      writeFile(
        path.join("data", "districts", "fat_districts.csv"),
        output,
        err => {
          if (err) throw err;
          stdout.write("WE DID THE CSV 🚀\n");
        }
      ); // close writeFile callback.
    }
  );
}
