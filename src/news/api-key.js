import config from "../environment";
// import readline from "readline";
// import { stdin, stdout } from "process";
import { stdout } from "process";
// import queryDomains from "./query-domains";
import getTotalArticlesPerDomain from "../news/get-total-articles-per-domain";

export default function(emitter){
  if (config.newsApiKey) {
    stdout.write(`\nIt looks like you have a Google News API key registered with this app.
      \nThat key is: ${config.newsApiKey}\n`); 
    emitter.emit("getApiKey", config.newsApiKey);
    getTotalArticlesPerDomain(config.newsApiKey, "blue");
  // } else {
  //   const rl = readline.createInterface(stdin, stdout);
  //   rl.question("Cannot find a Google News API key. Please get one at http://newsapi.org.\n\nThen, enter it here > ", answer => {
  //     rl.close();
  //     emitter.emit("getApiKey", answer);
  //   });
  }
}
