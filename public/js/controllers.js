'use strict';

/* Controllers */

var bidControllers = angular.module('bidControllers', []);

bidControllers.controller('homeCtrl', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/api/findAllSessions'
    }).
    success(function (data, status, headers, config) {
        $scope.sessions = data;
    }).
    error(function (data, status, headers, config) {
        $scope.name = 'Error!'
    });
});

bidControllers.controller('loginCtrl', function ($scope, $http) {
    // write Ctrl here
})
