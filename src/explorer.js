import $ from "jquery";
// import explorerBlocks from "./explorer/blocks";
import explorerTree from "./explorer/tree";

export default function(){
  $("#v2-div").show();
  // explorerBlocks();
  $(document).ready(() => {
    explorerTree();
    $("#explorer-viz").show();
  });
}
