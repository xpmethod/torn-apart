import { readdir, readFile } from "fs";

export default function() {
  const reportsDir = "data/news-sniffer-reports";
  let counter = 0;
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
              counter = counter + json.totalResults;
              console.log(counter);
            });
          });
        });
      }
    });
  });
}
