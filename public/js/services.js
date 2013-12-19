'use strict';

var bidServices = angular.module('bidServices', ['ngResource']);

bidServices.factory('Bidsessions', ['$resource',
        function($resource) {
            return $resource('api/sessions', {}, {});
        }]);
