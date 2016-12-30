"use strict";

angular.module('controllers.main', [])
.controller('MainCtrl', ["$scope", "$location", function ($scope, $location) {
    $scope.application = {
        title: "Zoo Angular Application",
    }
    $scope.filterOptions = {
        filterText: ''
    };
}]);