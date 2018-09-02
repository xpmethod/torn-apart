import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | visualizations/rain', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:visualizations/rain');
    assert.ok(route);
  });
});
