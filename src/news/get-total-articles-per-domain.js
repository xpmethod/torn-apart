import NewsAPI from "newsapi";
import { createWriteStream } from "fs";
import { resolve, join } from "path";
import _ from "lodash";
import { fileLinesToArray } from "../file-utils";

export default function(apiKey, teamName) {
  const newsapi = new NewsAPI(apiKey);
  const dataPath = resolve("data", "google-index");
  const output = createWriteStream(
    join(dataPath, `${teamName}-team-with-count.csv`),
    { flags: "a" }
  );
  output.write("domain,totalResults\n");
  _.each(fileLinesToArray(join(dataPath, `${teamName}-team.txt`)), domain => {
    if (domain.length > 0) {
      newsapi.v2
        .everything({
          pageSize: 100,
          domains: domain
        })
        .then(response => {
          output.write(`${domain},${response.totalResults}\n`);
        });
    }
  });
}
