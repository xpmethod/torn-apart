import NewsAPI from "newsapi";
import { fileWriteCSV } from "../file-utils";
import { resolve, join } from "path";
import _ from "lodash";
import { fileLinesToArray } from "../file-utils";

export default function (apiKey, teamName) {
  const newsapi = new NewsAPI(apiKey);
  const dataPath = resolve("data", "google-index");
  const results = fileLinesToArray(join(dataPath, `${teamName}-team.txt`))
    .map(source => { return { domain: source }; });
  _.each(results, source => {
    if (source.domain) {
      newsapi.v2.everything({
        pageSize: 100,
        domains: source.domain
      }).then( response => {
        source.totalResults = response.totalResults;
      });
    }
  });
  fileWriteCSV(join(dataPath, `${teamName}-team-with-count.csv`), results);
}

