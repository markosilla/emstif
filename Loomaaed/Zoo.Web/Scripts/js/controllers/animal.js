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
        dbAnimals.remove({ id: animal.Id }, function () {
            var index = $scope.animals.indexOf(animal);
            $scope.animals.splice(index, 1);

            toastr.success('Animal ' + animal.Id + ' deleted!')
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

    $scope.cancelForm = function () {
        $location.path("/animals");
    }

    $q.all([
        dbSpecies.query().$promise,
    ]).then(function (results) {
        $scope.species = results[0];
        $scope.animal = new dbAnimals();
        
        $scope.submitForm = function () {
            if ($scope.animal_form.$valid) {
                $scope.animal.CreationDate = new Date();
                $scope.animal.$save(function () {
                    toastr.success("Animal \"" + $scope.animal.Name + "\" created");
                    $location.path("/animals");
                });
            } else {
                brLog.error("Correct the errors and try again");
            }
        };
        //$scope.submitForm = function () {
        //    if ($scope.animal_form.$valid) {
        //        var dto = angular.copy($scope.animal);
        //        dto.CreationDate = new Date();

        //        var request = { method: 'POST', url: '/api/animals', headers: { 'Content-Type': 'application/json' }, data: dto }

        //        $http(request)
        //        .then(function successCallback(response) {

        //            toastr.success("Animal \"" + $scope.animal.Name + "\" created");
        //            $location.path("/animals");

        //        }, function errorCallback(response) {
        //            // Showing errors.
        //            //$scope.errorName = data.errors.name;
        //            //$scope.errorUserName = data.errors.username;
        //            //$scope.errorEmail = data.errors.email;
        //            toastr.error("Error: " + response.status);
        //        });

        //    } else {
        //        //toastr.error("Validation error!");
        //    }
        //}
    });

}])
.controller('EditAnimalCtrl', ["$scope", "dbCrud", "dbAnimals", "dbSpecies", "$location", "$http", "$q", "$routeParams", function ($scope, dbCrud, dbAnimals, dbSpecies, $location, $http, $q, $routeParams) {

    $scope.cancelForm = function () {
        $location.path("/animals");
    }

    $q.all([
        dbSpecies.query().$promise,
        dbAnimals.get({ id: parseInt($routeParams.id, 10) }).$promise
    ]).then(function (results) {
        $scope.species = results[0];
        $scope.animal = results[1];

        $scope.submitForm = function () {
            //$scope.animal.Name = 'something else';
            $scope.animal.$update(function () {
                toastr.success("Animal \"" + $scope.animal.Name + "\" updated");
                $location.path("/animals");
            });
        };

        //$scope.species = results[0];

        //$scope.Name = results[1].Name;

        //$scope.saveButtonText = "Save";
        //$scope.save = function () {
        //    var temp = angular.copy($scope.model);
        //    if ($scope.main_form.$valid) {
        //        temp.$save({}, function (model, headers) {
        //            toastr.success("Station \"" + model.Name + "\" saved");

        //        });
        //    } else {
        //        brLog.error("Correct the errors and try again");
        //    }
        //};
    });
}]);