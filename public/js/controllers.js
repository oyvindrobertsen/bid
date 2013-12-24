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
        $scope.sessions = Bidsessions.query();
        resetForm();
    };
}]);

bidControllers.controller('sessionAdminCtrl', ['$scope', '$routeParams', 'Bidsession', 'Participants', function($scope, $routeParams, Bidsession, Participants) {
    $scope.session = Bidsession.query({id: $routeParams.id});
    $scope.participant = {session_id: $routeParams.id, name: '', email: ''};

    var cleanParticipantForm = function() {
        $scope.participant.name = '';
        $scope.participant.email = '';
    };

    $scope.addParticipant = function() {
        Participants.save($scope.participant, function() {
            $scope.session = Bidsession.query({id: $routeParams.id});
            cleanParticipantForm();
        });
    };

    $scope.resetParticipantForm = function() {
        $scope.session = Bidsession.query({id: $routeParams.id});
        cleanParticipantForm();
    };
}]);
