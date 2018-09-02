import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | visualizations/freezer/murderboard", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    let route = this.owner.lookup("route:visualizations/freezer/murderboard");
    assert.ok(route);
  });
});
