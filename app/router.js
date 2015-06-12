import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('sessions');
  // TODO: Add paging support
  this.resource('session', {path: '/session/:session_id'}, function(){
      this.resource('comparison', {path: '/:source_id/:target_id'});
  });

});

export default Router;
