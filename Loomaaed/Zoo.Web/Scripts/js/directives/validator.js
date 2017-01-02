'use strict';

var INTEGER_REGEXP = /^-?\d+$/;

angular.module('directives.yearofbirth', [])
app.directive('integer', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.integer = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }
                var maxYear = new Date().getFullYear();

                if (INTEGER_REGEXP.test(viewValue) == false) {
                    toastr.error("Birthyear must be an integer value!");
                    return false;
                }

                if (viewValue > maxYear) {
                    toastr.error("Birthyear can not be in the future!");
                    return false;
                }

                // it is valid
                return true;
            };
        }
    };
});

angular.module('directives.uniqueAnimal', [])
app.directive('uniqueAnimal', ["dbAnimals", function (dbAnimals) {
    return {
        require: 'ngModel',
        //restrict: 'A',
        //scope: true,
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.uniqueAnimal = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                //species selected
                if (viewValue.Id && scope.animal) {
                    if (scope.animal.Name) {
                        dbAnimals.get({ name: scope.animal.Name, speciesId: viewValue.Id }, function (data) {
                            if (data && data.Name && data.Species.Name) {
                                toastr.error("Animal with name " + data.Name + " and species " + data.Species.Name + " is not unique!");
                                return false;
                            }
                        });
                    }
                }
                else if (viewValue && scope.animal) {
                    //name typed - check that both name and species are present
                    if (scope.animal.Species) {
                        dbAnimals.get({ name: viewValue, speciesId: scope.animal.Species.Id }, function (data) {
                            if (data && data.Name && data.Species.Name) {
                                toastr.error("Animal with name " + data.Name + " and species " + data.Species.Name + " is not unique!");
                                return false;
                            }
                        });
                    }
                }

                // it is valid
                return true;
            };
        }
    };
}]);