angular.module('charts.controllers')
  .controller('DataCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
    console.log($scope.yUnits);
    console.log($scope.xUnits);
    console.log($scope.sample);
  }]);
