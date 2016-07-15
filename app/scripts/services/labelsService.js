angular.module('charts.services')
  .service('labelsService', ['$resource',
    function($resource) {
      var url = 'http://localhost:3000/api/labels/:id';
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
