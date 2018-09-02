import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | visualizations/gain', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:visualizations/gain');
    assert.ok(route);
  });
});
