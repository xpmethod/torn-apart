import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("gain");
  this.route("rain");
  this.route("districts");
  this.route("lines");
  this.route('freezer', function() {
    this.route('icetray');
    this.route('murderboard');
  });
});

export default Router;
