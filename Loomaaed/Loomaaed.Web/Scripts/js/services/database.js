
angular.module('services.database', ['ngResource'])
    .factory('dbAnimals', ["$resource", function ($resource) {
        return $resource('/api/animals/:id', { id: '@id' });
    }])
    .factory('dbSpecies', ["$resource", function ($resource) {
        return $resource('/api/species/:id', { id: '@id' });
    }]);