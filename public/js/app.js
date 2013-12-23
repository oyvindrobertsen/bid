'use strict';

// Declare app level module which depends on filters, and services

angular.module('bidApp', [
  'ngRoute',
  'ngResource',
  'bidControllers',
  'bidServices'
]).
config(function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/app', {
            templateUrl: 'partials/mainpartial.html',
            controller: 'appCtrl'
        }).
        when('/session/:id', {
            templateUrl: 'partials/sessionadminpartial.html',
            controller: 'sessionAdminCtrl'
        }).
        otherwise({
            redirectTo: '/app'
        });

    $locationProvider.html5Mode(true);
});
