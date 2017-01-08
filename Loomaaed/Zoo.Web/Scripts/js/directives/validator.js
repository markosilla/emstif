'use strict';

angular.module('directives.uniqueAnimal', [])
app.directive('uniqueAnimal', ["dbAnimals", function (dbAnimals) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            function checkUniqueness(scope) {
                if (scope.animal.Name && scope.animal.SpeciesID) {
                    dbAnimals.get({ name: scope.animal.Name, speciesId: scope.animal.SpeciesID }, function (data) {
                        if (data && data.Name && data.Species.Name) {
                            ctrl.$setValidity('uniqueAnimal', false);
                        }
                    });
                }
                ctrl.$setValidity('uniqueAnimal', true);
                scope.$apply();
            }

            //elm.on('change', function () { toastr.success("change");checkUniqueness(scope) });
            elm.on('click', function () { checkUniqueness(scope) });
            elm.on('blur', function () { checkUniqueness(scope) });
        }
    };
}]);