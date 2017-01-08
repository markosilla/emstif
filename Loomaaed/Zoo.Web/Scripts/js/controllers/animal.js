"use strict";

angular.module('controllers.animal', [])
.controller('ListAnimalsCtrl', ["$scope", "dbAnimals", "dbCrud", "$location", function ($scope, dbAnimals, dbCrud, $location) {
    var currentTime = new Date();
    function getAverageAge() {
        var nofanimals = $scope.animals.length;
        var sumOfAges = 0;

        $scope.animals.forEach(function (a) {
            sumOfAges += (currentTime.getFullYear() - a.YearOfBirth);
        });
        return sumOfAges / nofanimals;
    };
    $scope.deleteAnimal = function (animal) {
        dbAnimals.remove({ id: animal.AnimalID }, function () {
            var index = $scope.animals.indexOf(animal);
            $scope.animals.splice(index, 1);

            toastr.success('Animal ' + animal.AnimalID + ' deleted!')
            $scope.averageage = getAverageAge();
        });
    };
    dbAnimals.query(function (data) {
        $scope.animals = data;
        $scope.animals.forEach(function (a) {
            /* Siit tuleb ebatäpsus, kuna kasutaja tahtis muuta sünniaastat. */
            a.age = (currentTime.getFullYear() - a.YearOfBirth);
        });

        dbCrud.pagination($scope, $scope.animals, "predicate", "reverse");
        $scope.averageage = getAverageAge();
    });
}])
.controller('CreateAnimalCtrl', ["$scope", "dbCrud", "dbAnimals", "dbSpecies", "$location", "$http", "$q", "$routeParams", "$resource", function ($scope, dbCrud, dbAnimals, dbSpecies, $location, $http, $q, $routeParams, $resource) {

    $scope.SaveButtonText = "Add New";
    $scope.cancelForm = function () {
        $location.path("/animals");
    }

    $q.all([
        dbSpecies.query().$promise,
    ]).then(function (results) {
        $scope.species = results[0];
        $scope.animal = new dbAnimals();
        $scope.currentYear = new Date().getFullYear();
        
        $scope.submitForm = function () {
            if ($scope.animal_form.$valid) {
                $scope.animal.CreationDate = new Date();
                $scope.animal.$save(function () {
                    toastr.success("Animal \"" + $scope.animal.Name + "\" created");
                    $location.path("/animals");
                });
            } else {
                toastr.error("Correct the errors and try again");
            }
        };
    });

}])
.controller('EditAnimalCtrl', ["$scope", "dbCrud", "dbAnimals", "dbSpecies", "$location", "$http", "$q", "$routeParams", function ($scope, dbCrud, dbAnimals, dbSpecies, $location, $http, $q, $routeParams) {

    $scope.SaveButtonText = "Save Changes";
    $scope.cancelForm = function () {
        $location.path("/animals");
    }

    $q.all([
        dbSpecies.query().$promise,
        dbAnimals.get({ id: parseInt($routeParams.id, 10) }).$promise
    ]).then(function (results) {
        $scope.species = results[0];
        $scope.animal = results[1];
        $scope.currentYear = new Date().getFullYear();

        $scope.animal.SpeciesID = $scope.animal.Species.SpeciesID;
        $scope.submitForm = function () {
            
            if ($scope.animal_form.$valid) {
                $scope.animal.id = $scope.animal.AnimalID;
                $scope.animal.$update(function () {
                    toastr.success("Animal \"" + $scope.animal.Name + "\" changed!");
                    $location.path("/animals");
                });
            } else {
                toastr.error("Correct the errors and try again");
            }
        };
    });
}]);