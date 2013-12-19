'use strict';

/* Controllers */

var bidControllers = angular.module('bidControllers', ['bidServices']);

bidControllers.controller('appCtrl', ['$scope', 'Bidsessions', function($scope, Bidsessions) {
    $scope.sessions = Bidsessions.query();
    
    var resetForm = function() {
        $scope.session.name = "";
        $scope.session.description = "";
    };

    $scope.addSession = function() {
        Bidsessions.save($scope.session, function() {
            $scope.sessions = Bidsessions.query();
            resetForm();
        });
    };

    $scope.resetForm = function() {
        resetForm();
        $scope.sessions = Bidsessions.query();
    }
}]);
