angular.module('app')
  .factory('Game', gameService);

gameService.$inject = ['$resource'];

function gameService($resource) {
  return $resource(
    '/api/games/:id',
    {id: '@_id'},
    {
      forUser: {
        method: 'GET',
        url: '/api/games/user',
        isArray: true
      }
    }
  );
}
