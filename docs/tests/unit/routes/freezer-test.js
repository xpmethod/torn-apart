import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | visualizations/freezer', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:visualizations/freezer');
    assert.ok(route);
  });
});
