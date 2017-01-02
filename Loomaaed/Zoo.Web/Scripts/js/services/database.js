
angular.module('services.database', ['ngResource'])
    .factory('dbAnimals', ["$resource", function ($resource) {
        return $resource('/api/animals/:id', { id: '@id' }, {
            update: { method: 'PUT' },
            query: { method: 'GET', isArray: true },
            get: { method: 'GET' },
            delete: { method: 'DELETE' }
        });
    }])
    .factory('dbSpecies', ["$resource", function ($resource) {
        return $resource('/api/species/:id', { id: '@id' });
    }]);