import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';
import ngUiRouter from 'angular-ui-router';

import '/imports/startup/accounts-config.js';

angular.module('simple-todos', [
  angularMeteor,
  'accounts.ui',
  ngMaterial,
  ngMdIcons,
  ngUiRouter,
]).config(function($mdThemingProvider) {
  'ngInject';

  $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .accentPalette('blue');
});
