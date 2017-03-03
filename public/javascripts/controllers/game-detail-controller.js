angular.module('app')
  .controller('GameDetailController', GameDetailController);

  GameDetailController.$inject = ['Game', 'Play', '$stateParams', '$state', 'UserService']

  function GameDetailController(Game, Play, $stateParams, $state, UserService) {
    var vm = this;

    Game.get({id: $stateParams.id}, function(game) {
      game.plays = game.plays.filter(p => p.user === UserService.getUser()._id);
      vm.game = game;
    });

    vm.newPlay = function(){
      $state.go('new-play', {id: vm.game._id});
    }
  }
