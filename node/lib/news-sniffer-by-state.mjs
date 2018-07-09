import { existsSync, mkdirSync, writeFile, readFile, readFileSync } from "fs";
import { stdout } from "process";
import states from "./states";
import config from "../environment";
import parse from "csv-parse";
import NewsAPI from "newsapi";
import path from "path";

export default function(){
  // fire up the newsapi
  const newsapi = new NewsAPI(config().newsApiKey);
  // load in the news sources synchronously so we don't have to wait below.
  const sourcesByState = JSON.parse(readFileSync(path.join("data","news-sources-by-state.json")));
  // Read in the news-sniffing csv
  readFile(path.join("data", "facilities-for-news-sniffing.csv"), (err, data) => {
    if (err) throw err;
    // parse the facilities csv as an array of objects
    parse(data, { columns: true }, (err, facilities) => {
      if (err) throw err;
      // iterate over the list of facilities
      facilities.map( facility => {
        // skip the facility if it doesn't have a state attached to it.
        if (facility["State"]){
          const stateName = states().filter(state => state.abbreviation === facility["State"])[0].name;
          stdout.write(`Checking on ${facility["Name"]} in ${stateName}\n`);
          // grab the sources for the home state of the facility.
          const sources = sourcesByState[stateName];
          // build the container for the results.
          const results = {
            totalResults: 0,
            articles: [],
            status: ""
          };
          // now build the domain chunks list for the query.
          const domainChunks = [];
          if(sources.join(",").length < 1500){
            // only need one chunk
            domainChunks.push(sources.join(","));
          } else {
            // need to split it in two.
            domainChunks.push(sources.splice(0, Math.ceil(sources.length / 2)).join(","));
            domainChunks.push(sources.join(","));
          }
          domainChunks.map( (chunk, i, array) => {
            newsapi.v2.everything({
              q: facility["Name"],
              pageSize: 100,
              domains: chunk 
            }).then( response => {
              results.totalResults += response.totalResults;
              results.articles.push(response.articles);
              results.status = response.status;
              if (chunk === array[array.length - 1]){
                // we're done w/ these domains, so we can print the report.
                results.articles = [].concat.apply([], results.articles);
                const reportDir = path.join("data", "news-sniffer-reports", facility["DETLOC"]);
                if (!existsSync(reportDir)){
                  mkdirSync(reportDir);
                }
                const thePath = path.join(reportDir, `${stateName}.json`);
                writeFile(thePath, JSON.stringify(results, null, 2), (err) => {
                  if (err) throw err;
                  stdout.write(`Saved ${thePath}\n`);
                });
              }
            });
          });
        }
      }); // Closes facilities .map();
    });
  });
}
