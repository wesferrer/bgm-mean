angular.module('app')
  .controller('GameDetailController', GameDetailController);

  GameDetailController.$inject = ['Game', '$stateParams']

  function GameDetailController(Game, $stateParams) {
    var vm = this;

    vm.game = Game.get({id: $stateParams.id});

  }
