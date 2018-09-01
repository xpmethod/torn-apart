import EventEmitter from "events";
import { stdout, stdin } from "process";
import apiKey from "./news/api-key";

const emitter = new EventEmitter();

stdin.setEncoding("utf8");

stdout.write("Welcome to the Torn Apart/Separados Google news sniffer.\n");
apiKey(emitter);

// emitter.on("getApiKey", (key) =>  {
//   stdout.write("\nThe script is currently set to get total articles from each indexed domain\n");
//   const rl = readline.createInterface(stdin, stdout);
//   rl.question("Which team of domains are you testing, red or blue?", answer => {
//     rl.close();
//     answer.trim();
//     if (answer !== "blue" || answer !== "red") {
//       emitter.emit("error", "“blue” or “red” are the only team names.");
//     } else {
//       getTotalArticlesPerDomain(key, answer);
//     }
//   });
// });

emitter.on("error", error => {
  stdout.write(`ERROR: ${error} \n`);
});
