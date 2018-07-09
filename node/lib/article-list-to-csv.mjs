import { readdir, readFile } from "fs";
import { stdout } from "process";

export default function() {
  
  stdout.write("detloc,state,source,author,title,description,url\n");
  const reportsDir = "data/news-sniffer-reports";
  readdir(reportsDir, (e, detlocDirs) => {
    if (e) throw e;
    detlocDirs.map(dir => {
      if(dir !== ".DS_Store"){
        readdir(`${reportsDir}/${dir}`, (e, reports) => {
          if (e) throw e;
          reports.map(report => {
            readFile( `${reportsDir}/${dir}/${report}`, (e, file) => {
              if (e) throw e;
              const json = JSON.parse(file);
              if (json.articles.length > 0){
                json.articles.map( article => {
                  stdout.write(JSON.stringify([dir, 
                    report.replace(".json", ""),
                    article.source.name,
                    article.author,
                    article.title,
                    article.description,
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
