import rainBuildData from "./rain/build-rain-data";
import districtsBuildAllData from "./districts/build-all-contracts";
import districtsBindData from "./districts/bind-contracts-to-districts";
import freezerBuildGraph from "./freezer/build-graph";
// import gainBuildData from "./gain/build-data";

rainBuildData();
districtsBuildAllData(districtsBindData);
freezerBuildGraph();
// gainBuildData();


