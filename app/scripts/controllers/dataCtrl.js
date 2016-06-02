angular.module('charts.controllers')
  .controller('DataCtrl', ['$rootScope', '$scope', '$mdDialog', function($rootScope, $scope, $mdDialog) {
    $scope.saveUnits = function() {
      $rootScope.yUnits = $scope.yUnits;
      $rootScope.xUnits = $scope.xUnits;
      $rootScope.sample = $scope.sample;
      $mdDialog.hide();
    };
  }]);
