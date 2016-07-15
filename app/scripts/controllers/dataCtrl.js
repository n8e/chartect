angular.module('charts.controllers')
  .controller('DataCtrl', ['$rootScope', '$scope', '$mdDialog', 'labelsService',
    function($rootScope, $scope, $mdDialog, labelsService) {

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

        labelsService.save({
          y_units: $scope.yUnits,
          x_units: $scope.xUnits
        }, function(resp) {
          $rootScope.labels_id = resp._id;
        });

        $mdDialog.hide();
        return $rootScope.savedDimensions;
      };
    }
  ]);
