'use strict';

// Declare app level module which depends on filters, and services

angular.module('bidApp', [
  'ngRoute',
  'bidControllers'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/app', {
      templateUrl: 'partials/homepartial.html',
      controller: 'appCtrl'
    }).
    otherwise({
      redirectTo: '/app'
    });

  $locationProvider.html5Mode(true);
});
