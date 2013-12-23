'use strict';

var bidServices = angular.module('bidServices', ['ngResource']);

bidServices.factory('Bidsessions', ['$resource',
        function($resource) {
            return $resource('api/sessions', {}, {});
        }]);

bidServices.factory('Bidsession', ['$resource',
        function($resource) {
            return $resource('api/sessions/:id', {}, {
                query: {method:'GET', params:{}, isArray: false}
            });
        }]);
