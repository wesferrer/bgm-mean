angular.module('app')
.controller('NewPlayController', NewPlayController);

NewPlayController.$inject = ['$state', 'Play', '$stateParams']

function NewPlayController($state, Play, $stateParams) {
  var vm = this;

  vm.savePlay = function(){
    vm.play.game = $stateParams.id;
    Play.save(vm.play, function(play){
      console.log(play)
      $state.go('game-detail', {id: $stateParams.id})
    });
  }


 }
