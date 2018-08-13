import { writeFile, readFile } from "fs";
import { stdout } from "process";
import path from "path";
import parse from "csv-parse";
import _ from "lodash";

readFile(path.join("data", "i18n.csv"), (err, data) => {
  if(err) throw err;
  parse(data, {columns: true}, (err, messages) => {
    if(err) throw err;
    const missing = { en: [], es: [], fr: [] };
    const i18n = { en: {}, es: {}, fr: {} };
    _.each(["en", "es", "fr"], lang => {
      _.each(messages, message => {
        if( message[`${lang}_final`] === "TRUE"){ 
          i18n[lang][message.key] = message[lang];
        } else {
          missing[lang].push(message.key);
        }
      });
    });
    stdout.write(`Missing messages: en, ${missing.en.length}; es, ${missing.es.length}; fr, ${missing.fr.length}\n`);
    _.each(["en", "es", "fr"], lang => stdout.write(missing[lang].join(", ") + "\n"));
    writeFile(path.join("src", "i18n", "en-es-fr.json"), 
      JSON.stringify(i18n, null, 2), 
      (err) => {
        if(err) throw err;
        stdout.write("WE DID THE THING 🚀\n");
      }
    );
  });
});
