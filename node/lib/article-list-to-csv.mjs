import { readdir, readFile } from "fs";
import { stdout } from "process";
import { join } from "path";

export default function() {
  
  stdout.write("detloc,state,source,author,title,description,url\n");
  const reportsDir = join("data", "news-sniffer-reports");
  readdir(reportsDir, (e, detlocDirs) => {
    if (e) throw e;
    detlocDirs.map(dir => {
      if(dir !== ".DS_Store"){
        readdir(join(reportsDir, dir), (e, reports) => {
          if (e) throw e;
          reports.map(report => {
            readFile(join(reportsDir, dir, report), (e, file) => {
              if (e) throw e;
              const json = JSON.parse(file);
              if (json.articles.length > 0){
                json.articles.map( article => {
                  const fields = [article.source.name, article.author, article.title, article.description].map( field => {
                    if (field) {
                      return field.replace(/"/g, "“");
                    }
                  });
                  stdout.write(JSON.stringify([dir, 
                    report.replace(".json", ""),
                    fields[0],
                    fields[1],
                    fields[2],
                    fields[3],
                    article.url
                  ]).replace(/^\[/, "").replace(/\]$/, "") + "\n");
                });
              }
            });
          });
        });
      }
    });
  });
}
