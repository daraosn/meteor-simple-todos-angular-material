import angular from 'angular';

angular.module('app')
.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    component: 'todosList',
    url: '/',
  })
  .state('about', {
    component: 'about',
    url: '/about',
  })
  .state('login', {
    component: 'login',
    url: '/login',
  })
  .state('auth', {
    abstract: true,
  })
  .state('auth.dashboard', {
    component: 'dashboard',
    url: '/dashboard',
  });
})
.run(function($q, $rootScope, $state, $transitions, Auth) {
  'ngInject';

  // global access to auth service
  $rootScope.auth = Auth;

  // check transitions into authorized zones
  $transitions.onBefore({ to: 'auth.**' }, function(trans) {
    return Auth.state(trans.to().name);
  });
});

