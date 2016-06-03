angular.module('charts.controllers')
  .controller('DataCtrl', ['$rootScope', '$scope', '$mdDialog',
    function($rootScope, $scope, $mdDialog) {

      $scope.saveUnits = function() {
        // create an array of 'sample' empty objects
        var dataArray = [];
        for (var i = 0; i < $scope.sample; i++) {
          dataArray.push({});
        }
        $scope.dataArray = dataArray;
        $rootScope.savedDimensions = {
          yUnits: $scope.yUnits,
          xUnits: $scope.xUnits,
          sample: $scope.sample,
          dataArray: $scope.dataArray
        };
        $mdDialog.hide();
        return $rootScope.savedDimensions;
      };
    }
  ]);
