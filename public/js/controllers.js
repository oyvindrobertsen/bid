'use strict';

/* Controllers */

var bidControllers = angular.module('bidControllers', []);

bidControllers.controller('appCtrl', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/api/findAllSessions'
    }).
    success(function (data, status, headers, config) {
        $scope.sessions = data;
        $scope.sessionCount = data.length;
    }).
    error(function (data, status, headers, config) {
        $scope.errormsg = "Couldn't GET /api/findAllSessions";
    });
});

bidControllers.controller('loginCtrl', function ($scope, $http) {
    // write Ctrl here
});

bidControllers.controller('registerCtrl', function ($scope, $http) {
    
});
