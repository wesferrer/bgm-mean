angular.module('app')
.controller('NewGameController', NewGameController);

NewGameController.$inject = ['$http', '$state', 'Game', 'SearchService'];

function NewGameController($http, $state, Game, SearchService) {
  var vm = this;

  vm.addGame = function(game) {
    $http.get('https://bgg-json.azurewebsites.net/thing/' + game['$'].id)
    .then(res => {
      console.log(res.data)
      var g = res.data;
      Game.save({
        apiId: g.gameId,
        name: g.name,
        publisher: g.publishers[0],
        year: g.yearPublished,
        image: g.image,
      }).$promise.then(game => {
        $state.go('game-detail', {id: game._id});
      });
    });
    // Game.save({text: vm.newGame}, function(Game) {
    //   vm.newGame = '';
    //   $state.go('Games');
    // });
  };
  vm.doSearch = function(search) {
    SearchService.getResults(search, function(data){
      vm.games = data;
    })
  }
}

