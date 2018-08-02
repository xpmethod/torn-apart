import $ from "jquery";
// import explorerBlocks from "./explorer/blocks";
// import explorerTree from "./explorer/tree";
import explorerMurderboard from "./explorer/murderboard";

export default function(){
  $("#v2-div").show();
  // explorerBlocks();
  $(document).ready(() => {
    // explorerTree();
    explorerMurderboard();
    $("#explorer-viz").show();
  });
}
