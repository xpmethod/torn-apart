import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | visualizations/lines", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    let route = this.owner.lookup("route:visualizations/lines");
    assert.ok(route);
  });
});
