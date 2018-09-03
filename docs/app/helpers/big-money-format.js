import { helper } from "@ember/component/helper";
import _ from "lodash";
import { format } from "d3-format";

export function bigMoneyFormat(number) {
  return format(".2s")(_.toInteger(number)).replace(/G/, "B");
}

export default helper(bigMoneyFormat);
