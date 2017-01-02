"use strict";

// Declare app level module which depends on filters, and services
var app = angular.module(
    'ZooApp', [
    'ngRoute',
    'ngResource',
    'services.database',
    'services.dbCrud',
    'controllers.main',
    'controllers.animal',
    'directives.yearofbirth',
    'directives.uniqueAnimal',
    'ui.bootstrap']
);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/animals', { templateUrl: 'partials/animals.html', controller: 'ListAnimalsCtrl' });
    $routeProvider.when('/animal/edit/:id', { templateUrl: 'partials/animal.html', controller: 'EditAnimalCtrl' });
    $routeProvider.when('/animal/create', { templateUrl: 'partials/animal.html', controller: 'CreateAnimalCtrl' });
    $routeProvider.otherwise({ redirectTo: '/animals' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');

}])
.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
    $provide.factory('ErrorInterceptor', ['$q', function ($q) {
        return {
            // On request failure
            requestError: function (rejection) {
                toastr.error(JSON.stringify(rejection.data + rejection.statusText), "requestError");
                // Return the promise rejection.
                return $q.reject(rejection);
            },
            // On response failture
            responseError: function (rejection) {
                toastr.error(JSON.stringify(rejection.data + rejection.statusText), "responseError");
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    }]);

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('ErrorInterceptor');
}]);

app.run(function () {

    //toastr.success('Angular executed', 'Miracle Max Says')
});