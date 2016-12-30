
angular.module('services.dbCrud', [])
    .factory('dbCrud', ["$location", "$http", "$timeout", "$q", "$window", "$filter", function ($location, $http, $timeout, $q, $window, $filter) {
        return {
            pagination: function (scope, inputArray, predicate, reverse) {
                scope.pagination = {
                    currentPage: 1,
                    pages: [],
                    itemsPerPage: 10,
                    itemsTotal: 0,
                    currentIndex: 0,
                    currentItems: [],
                    status: "",
                    getStatus: function () {
                        var start = this.currentIndex * this.itemsPerPage;
                        var stop = start + this.currentItems.length;
                        if (start < stop) {
                            start++;
                        }
                        return "Showing " + start + " to " + stop + " of total " + this.itemsTotal;
                    }
                };
                function update(newVal) {
                    scope.pagination.currentIndex = Math.max(0, scope.pagination.currentPage - 1);
                    scope.pagination.currentItems = scope.pagination.pages[scope.pagination.currentIndex] || [];
                    scope.pagination.status = scope.pagination.getStatus();
                };
                scope.$watch(function () {
                    return scope.pagination.currentPage;
                }, update);
                scope.$watch(function () {
                    return scope.filterOptions.filterText + inputArray.length
                }, function () {
                    var filtered = $filter('filter')(inputArray, scope.filterOptions.filterText);

                    scope.pagination.itemsTotal = filtered.length;
                    scope.pagination.pages = [];

                    for (var i = 0; i < scope.pagination.itemsTotal; i += scope.pagination.itemsPerPage) {
                        scope.pagination.pages.push(filtered.slice(i, i + scope.pagination.itemsPerPage));
                    }

                    update(scope.pagination.currentPage);
                });
            }
        };
    }]);
