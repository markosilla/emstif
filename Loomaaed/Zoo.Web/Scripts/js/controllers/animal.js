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
            a.age = (currentTime.getFullYear() - a.YearOfBirth);
        });

        dbCrud.pagination($scope, $scope.animals, "predicate", "reverse");
        $scope.averageage = getAverageAge();
        
    });
}])
.controller('CreateAnimalCtrl', ["$scope", "dbCrud", "dbAnimals", "dbSpecies", "$location", "$http", function ($scope, dbCrud, dbAnimals, dbSpecies, $location, $http) {

    dbSpecies.query(function (data) {
        $scope.species = data;
    });

    $scope.submitForm = function () {

        if ($scope.animal_form.$valid) {
            var dto = angular.copy($scope.animal);
            dto.CreationDate = new Date();

            dbSpecies.query(function (species) {
                dto.species.Name = species;
            });

            var request = { method: 'POST', url: '/api/animals', headers: { 'Content-Type': 'application/json' }, data: dto }

            $http(request)
            .then(function successCallback(response) {

                toastr.success("Animal \"" + model.Name + "\" created");
                $location.path("/animals");

            }, function errorCallback(response) {
                // Showing errors.
                //$scope.errorName = data.errors.name;
                //$scope.errorUserName = data.errors.username;
                //$scope.errorEmail = data.errors.email;
                toastr.error("Error: " + response.status);
            });

        } else {
            //toastr.error("Validation error!");
        }
    }



        //DROPDOWN
        //    $scope.items.sel

        //$scope.status = {
        //    isopen: false
        //};

        //$scope.toggled = function (open) {
        //    toastr.error(open);
        //};

        //$scope.toggleDropdown = function ($event) {
        //    $event.preventDefault();
        //    $event.stopPropagation();
        //    $scope.status.isopen = !$scope.status.isopen;
        //};

        //$scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
}]);
    //.controller('EditAnimalCtrl', ["$scope", "brCrud", "brStations", "brResources", "brConnections", "brMessageBox", "brLog", "$location", "$routeParams", "$q", function ($scope, brCrud, brStations, brResources, brConnections, brMessageBox, brLog, $location, $routeParams, $q) {
    //$q.all([
    //    brResources.query().$promise,
    //    brConnections.query().$promise,
    //    brStations.get({ id: parseInt($routeParams.id, 10) }).$promise
    //]).then(function (results) {


    //    $scope.resources = results[0];
    //    $scope.connections = results[1];
    //    var originalName = results[2].Name;
    //    $scope.model = results[2];
    //    $scope.jumboTron.getSlogan = function () {
    //        return "Station \"" + $scope.model.Name + "\" with " + $scope.model.Magazines.length + " connected magazines, " +
    //            $scope.model.Functions.length + " functions, " +
    //            $scope.model.Data.length + " data, and " +
    //            $scope.model.Files.length + " files.";
    //    }
    //    brCrud.connections($scope);
    //    brCrud.functions($scope);
    //    brCrud.data($scope);
    //    brCrud.files($scope);
    //    $scope.saveButtonText = "Save";
    //    $scope.save = function () {
    //        var temp = angular.copy($scope.model);
    //        if ($scope.main_form.$valid) {
    //            temp.$save({}, function (model, headers) {
    //                toastr.success("Station \"" + model.Name + "\" saved");
    //                $scope.uploadFiles("/Files/UploadStationFile", { id: model.ID }).then(function () {
    //                    $location.path("/stations");
    //                });
    //            });
    //        } else {
    //            brLog.error("Correct the errors and try again");
    //        }
    //    };
    //    $scope.showDeleteButton = true;
    //    $scope.deleteStation = function () {
    //        $scope.modal = brMessageBox("The station \"" + $scope.model.Name + "\" will be deleted from the database.", "Confirm delete!");
    //        $scope.modal.result.then(function () {
    //            brStations.remove({ id: $scope.model.ID }, function () {
    //                toastr.success("Station \"" + $scope.model.Name + "\" deleted");
    //                $location.path("/stations");
    //            });
    //        });
    //    };
    //brCrud.logWatches();
    //});
    //}]);
