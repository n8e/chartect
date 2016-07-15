angular.module('charts.controllers')
  .controller('HomeCtrl', ['$rootScope', '$scope', 'dataService',

    function($rootScope, $scope, dataService) {

      $scope.saveData = function(sample, dataArray) {
        sample = parseInt(sample);

        for (var j = 1; j <= sample * 2; j++) {
          var id = 'input_' + j;
          var position = Math.ceil(j / 2) - 1;
          // add the x and y coordinates to the body
          if (j % 2 === 0) {
            dataArray[position].y = document.getElementById(id).value;
          } else {
            dataArray[position].x = document.getElementById(id).value;
          }
          dataArray[position].labels_id = $rootScope.labels_id;
        }

        var count = 0;
        while (count < dataArray.length) {
          dataService.save(dataArray[count]);
          count++;
        }
      };
    }
  ]);
