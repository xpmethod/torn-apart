import NewsAPI from "newsapi";
import { stdout } from "process";
import { createWriteStream, readFileSync } from "fs";
import { resolve, join } from "path";
import _ from "lodash";
// import response from "./mocks/domains-query-response-object"

export default function(apiKey){
  const workDir = resolve("data", "google-index");
  const indexed = createWriteStream(join(workDir, "indexed.txt"), { flags: "a" });
  const notIndexed = createWriteStream(join(workDir, "not_indexed.txt"), { flags: "a" });
  const newsapi = new NewsAPI(apiKey);
  const ss = JSON.parse(readFileSync(resolve("data","news-sources-by-state.json")));
  const sources = _.shuffle(_.flatMap(ss)); // until I solve chaining…
  // const domainChunks = [["wsj.com", "bingo.com"], ["bongo.com", "nytimes.com"]];
  const domainChunks = _.chunk(sources, 20);
  _.each(domainChunks, (chunk, i) => {
    setTimeout(() => {
      stdout.write(`testing chunk ${i}\n`);
      newsapi.v2.everything({
        q: "Trump",
        pageSize: 100,
        domains: chunk.join(",")
      }).then( response => {
        chunk.map( domain => {
          if(response.articles.filter(article => article.url.match(domain.replace(/^www\./, ""))).length > 0){
            indexed.write(domain + "\n");
          } else {
            notIndexed.write(domain + "\n");
          }
        });
      });
    }, 5000);
  });
}
