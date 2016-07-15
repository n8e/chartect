angular.module('charts.controllers')
  .controller('LineCtrl', ['$scope', '$rootScope', 'dataService', 'labelsService',
    function($scope, $rootScope, dataService, labelsService) {
      $scope.lineArray = [];

      // get the data with the label_id in $rootScope.label_id
      $scope.dataArray = dataService.query({});
      $scope.dataArray.$promise.then(function(resp) {

        $scope.dataArray = resp.$promise.$$state.value;

        for (var i = 0; i < $scope.dataArray.length; i++) {
          if ($scope.dataArray[i].labels_id === $rootScope.labels_id) {
            $scope.lineArray.push(parseInt($scope.dataArray[i].y));
          }
        }
      });
      $scope.units = labelsService.get({ id: $rootScope.labels_id });

      // call the pie function with the new array
      $scope.plotter = function() {
        drawLineChart($scope.lineArray);
      };
    }
  ]);
