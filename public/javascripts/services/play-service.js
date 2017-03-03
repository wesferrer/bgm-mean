angular.module('app')
.factory('Play', playService);

playService.$inject = ['$resource'];

function playService($resource) {
  return $resource('/api/plays/:id', {id: '@_id'},
    {
      forUser: {
        method: 'GET',
        url: '/api/plays/user',
        isArray: true
      }
    }
  );
}
