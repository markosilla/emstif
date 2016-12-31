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
                    toastr.error("Year of birth must be integer value!");
                    return false;
                }

                if (viewValue > maxYear) {
                    toastr.error("Year of birth can not be in the future!");
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
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            var original;
            ctrl.$formatters.unshift(function (modelValue) {
                original = modelValue;
                return modelValue;
            });

            SIINPOOLELEI
            toastr.error("Animal name  is not unique!" + animal.Name);
            // using push() here to run it as the last parser, after we are sure that other validators were run
            ctrl.$parsers.push(function (viewValue) {
                if (viewValue && viewValue !== original) {
                    dbAnimals.get({ Name: viewValue }, function (data) {
                        if (data.Name == viewValue) {
                            ctrl.$setValidity('uniqueAnimal', false);
                            toastr.error("Animal name " + viewValue + " is not unique!" + $scope.animal.Species);
                            toastr.error("Animal name " + viewValue + " is not unique!");
                        } else {
                            ctrl.$setValidity('uniqueAnimal', true);
                            //toastr.success("Animal name " + viewValue + " is unique!");
                        }
                    });
                    return viewValue;
                }
            });
        }
    };
}]);