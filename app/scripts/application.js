(function() {
  'use strict';
  angular.module('charts.controllers', []);
  // require controllers
  require('./controllers/mainCtrl');
  require('./controllers/toolBarCtrl');
  require('./controllers/dataCtrl');

  window.app = angular.module('charts', [
    'charts.controllers',
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
        name: 'Dashboard',
        state: 'dashboard'
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
          controller: 'MainCtrl',
          templateUrl: 'views/home.html'
        })
        .state('dashboard', {
          url: '/dashboard',
          controller: 'DashboardCtrl',
          templateUrl: 'views/dashboard.html'
        });
      $locationProvider.html5Mode(true);
    }
  ]);
})();
