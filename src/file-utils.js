import { readFileSync, writeFile } from "fs";
import { stdout } from "process";
import parse from "csv-parse/lib/sync";
import stringify from "csv-stringify/lib/sync";

export function fileOpenCSV(filePath){
  return parse(readFileSync(filePath), { columns: true });
}

export function fileWriteCSV(filePath, data){
  writeFile(filePath, stringify(data, { header: true }), (err) => {
    if (err) throw err;
    stdout.write(`Saved ${filePath}\n`);
  });
}


  


