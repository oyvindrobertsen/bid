'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'index',
      controller: 'MyCtrl1'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
