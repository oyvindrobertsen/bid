'use strict';

// Declare app level module which depends on filters, and services

angular.module('bidApp', [
  'ngRoute',
  'bidControllers'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'partials/homepartial.html',
      controller: 'homeCtrl'
    }).
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
    }).
    when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'registerCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
