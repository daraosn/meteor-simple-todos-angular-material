import angular from 'angular';

angular.module('simple-todos')
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
  });
});
