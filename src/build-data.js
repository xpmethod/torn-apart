// import generateLanguageFiles from "./i18n/generate-language-files";
// import rainBuildData from "./rain/build-rain-data";
import buildDecoratorTable from "./build-decorator-table";
import districtsBuildAllData from "./districts/build-all-contracts";
import districtsBindData from "./districts/bind-contracts-to-districts";
import freezerBuildGraph from "./freezer/build-graph";
// import gainBuildData from "./gain/build-data";

buildDecoratorTable(decorations => {
  districtsBuildAllData(districtsBindData(decorations));
  freezerBuildGraph(decorations);
});
// generateLanguageFiles();
// rainBuildData();
// gainBuildData();


