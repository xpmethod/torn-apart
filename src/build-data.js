import buildDecoratorTable from "./build-decorator-table";
import rainBuildData from "./rain/build-rain-data";
import districtsBuildAllData from "./districts/build-all-contracts";
import districtsBindData from "./districts/bind-contracts-to-districts";
import freezerBuildGraph from "./freezer/build-graph";
import gainBuildData from "./gain/build-data";
import generateLanguageFiles from "./i18n/generate-language-files";

buildDecoratorTable();
rainBuildData();
districtsBuildAllData(districtsBindData);
freezerBuildGraph();
gainBuildData();
generateLanguageFiles();


