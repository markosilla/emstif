"use strict";

angular.module('controllers.main', [])
.controller('MainCtrl', ["$scope", "$location", function ($scope, $location) {
    $scope.application = {
        title: "Loomaaed Angular Application",
    }
    $scope.filterOptions = {
        filterText: ''
    };
}]);