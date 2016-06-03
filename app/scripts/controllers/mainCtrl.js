angular.module('charts.controllers')
  .controller('MainCtrl', ['$rootScope', '$scope', '$mdDialog', '$mdMedia', '$timeout', '$mdSidenav', '$log',
    function($rootScope, $scope, $mdDialog, $mdMedia, $timeout, $mdSidenav, $log) {
      $scope.showPrompt = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'DataCtrl',
            templateUrl: 'views/data.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
          })
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };

      // side nav

      $scope.toggleLeft = buildDelayedToggler('left');

      function debounce(func, wait, context) {
        var timer;
        return function debounced() {
          var context = $scope,
            args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildDelayedToggler(navID) {
        return debounce(function() {
          // Component lookup should always be available since we are not using `ng-if`
          $mdSidenav(navID)
            .toggle()
            .then(function() {
              $log.debug("toggle " + navID + " is done");
            });
        }, 200);
      }

      function buildToggler(navID) {
        return function() {
          // Component lookup should always be available since we are not using `ng-if`
          $mdSidenav(navID)
            .toggle()
            .then(function() {
              $log.debug("toggle " + navID + " is done");
            });
        };
      }
      $scope.close = function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
          .then(function() {
            $log.debug("close LEFT is done");
          });
      };

      $scope.saveData = function(sample, dataArray) {
        sample = parseInt(sample);
        for (var j = 1; j <= sample * 2; j++) {
          var id = 'input_' + j;
          if (j % 2 === 0) {
            dataArray[Math.ceil(j / 2) - 1].y = document.getElementById(id).value;
          } else {
            dataArray[Math.ceil(j / 2) - 1].x = document.getElementById(id).value;
          }
        }
      };
    }
  ]);
