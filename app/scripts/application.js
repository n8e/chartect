(function() {
  'use strict';

  // modules
  angular.module('charts.services', []);
  angular.module('charts.controllers', []);
  angular.module('charts.directives', []);

  // require services
  require('./services/dataService');
  require('./services/labelsService');

  // require controllers
  require('./controllers/mainCtrl');
  require('./controllers/homeCtrl');
  require('./controllers/dataCtrl');
  require('./controllers/pieCtrl');
  require('./controllers/lineCtrl');
  require('./controllers/histogramCtrl');
  require('./controllers/barCtrl');

  // require directives
  require('./directives/dataRow');

  // define app
  window.app = angular.module('charts', [
    'charts.services',
    'charts.controllers',
    'charts.directives',
    'ui.router',
    'ngResource',
    'ngMaterial'
  ]);

  window.app.run(['$rootScope', '$state', '$mdSidenav',
    function($rootScope, $state, $mdSidenav) {
      $rootScope.menu = [{
        name: 'Data',
        state: 'data'
      }, {
        name: 'Pie Chart',
        state: 'pie'
      }, {
        name: 'Bar Chart',
        state: 'bar'
      }, {
        name: 'Line Chart',
        state: 'line'
      }, {
        name: 'Histogram',
        state: 'histogram'
      }];

      $rootScope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      $rootScope.closeLeftMenu = function() {
        $mdSidenav('left').close();
      };
    }
  ]);

  window.app.config(['$stateProvider', '$urlRouterProvider',
    '$locationProvider', '$mdThemingProvider',
    function($stateProvider, $urlRouterProvider,
      $locationProvider, $mdThemingProvider) {

      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise('/404');

      // Set up theme the entire application
      $mdThemingProvider.theme('default')
        .primaryPalette('red');

      // Set up states
      $stateProvider
        .state('data', {
          url: '/',
          controller: 'HomeCtrl',
          templateUrl: 'views/home.html'
        })
        .state('pie', {
          url: '/pie',
          controller: 'PieCtrl',
          templateUrl: 'views/pie.html'
        })
        .state('bar', {
          url: '/bar',
          controller: 'BarCtrl',
          templateUrl: 'views/bar.html'
        })
        .state('line', {
          url: '/line',
          controller: 'LineCtrl',
          templateUrl: 'views/line.html'
        })
        .state('histogram', {
          url: '/histogram',
          controller: 'HistogramCtrl',
          templateUrl: 'views/histogram.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);
})();
