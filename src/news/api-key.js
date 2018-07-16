import config from "../environment";
// import readline from "readline";
import { stdout, stdin } from "process";

export default function(emitter){
  if (config.newsApiKey) {
    stdout.write(`\nIt looks like you have a Google News API key registered with this app.
      \nThat key is: ${config.newsApiKey}\n`); 
    emitter.emit("getApiKey", config.newsApiKey);
  // This worked all of once...
  // } else {
  //   const rl = readline.createInterface(stdin, stdout);
  //   rl.question("Cannot find a Google News API key. Please get one at http://newsapi.org.\n\nThen, enter it here > ", answer => {
  //     rl.close();
  //     emitter.emit("getApiKey", answer);
  //   });
  }
}
