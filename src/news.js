// import parse from "csv-parse";
import NewsAPI from "newsapi";
// import path from "path";
import EventEmitter from "events";
import { stdout, stdin } from "process";
import apiKey from "./news/api-key";

const emitter = new EventEmitter();

stdin.setEncoding("utf8");

stdout.write("Welcome to the Torn Apart/Separados Google news sniffer.\n");
apiKey(emitter);
emitter.on("getApiKey", (apiKey) => {
  const newsapi = new NewsAPI(apiKey);
  stdout.write(newsapi);
  stdout.write("\n\nblarg\n\n");
});

