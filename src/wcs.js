import { fileOpenCSV, fileWriteCSV } from "./file-utils";
import mungeMatrix from "./wcs/munge-matrix";
import { resolve, join } from "path";

const dataPath = resolve("data", "wcs");
const data = fileOpenCSV(join(dataPath, "city-removals-dirty.csv"));
const cleanData = mungeMatrix(data);
fileWriteCSV(join(dataPath, "city-removals-clean.csv"), cleanData);
// console.log(data);
// console.log(JSON.stringify(cleanData, null, 2));


