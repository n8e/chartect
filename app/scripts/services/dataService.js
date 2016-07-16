angular.module('charts.services')
  .service('dataService', ['$resource',
    function($resource) {
      var url = '/api/datum/:id';
      var resource = $resource(url, {
        id: '@id'
      }, {
        update: {
          // this method issues a PUT request
          method: 'PUT',
          params: {
            id: '@id'
          }
        }
      }, {
        stripTrailingSlashes: false
      });

      return resource;
    }
  ]);
