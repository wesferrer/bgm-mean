angular.module('app')
.controller('MyGamesController', MyGamesController);

MyGamesController.$inject = ['Game', '$state']

function MyGamesController(Game, $state) {
  var vm = this;

  //vm.games = Game.forUser();
  vm.games = Game.query();
  // vm.delGame = function(game) {
  //   game.$delete(function() {
  //     vm.games.splice(vm.games.findIndex(t => t._id === game._id), 1);    });
  // };

  console.log(vm.games);

  vm.goToNewGame = function() {
    console.log('********')
    $state.go('new-game');
  }



}
