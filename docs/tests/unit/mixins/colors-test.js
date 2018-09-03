import EmberObject from "@ember/object";
import ColorsMixin from "torn-apart/mixins/colors";
import { module, test } from "qunit";

module("Unit | Mixin | colors", function() {
  // Replace this with your real tests.
  test("it works", function(assert) {
    let ColorsObject = EmberObject.extend(ColorsMixin);
    let subject = ColorsObject.create();
    assert.ok(subject);
  });
});
