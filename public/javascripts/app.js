angular.module('app', ['ui.router', 'ngAnimate', 'ngResource'])
  .config(configRoutes)
  .run(runBlock);

runBlock.$inject = ['$rootScope', '$state', 'UserService'];

function runBlock($rootScope, $state, UserService) {
  $rootScope.$on('$stateChangeStart', function(evt, toState) {
    if (toState.loginRequired && !UserService.isLoggedIn()) {
      evt.preventDefault();
      $state.go('login');
    } else {
      $rootScope.bgStyle = toState.bgStyle;
    }
  });
}


angular.module('app').config(['$qProvider', function ($qProvider) {
  // handles the possibly rejected promise error
  $qProvider.errorOnUnhandledRejections(false);
}]);

configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

function configRoutes($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/users/login.html',
      controller: 'UserController as userCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/users/signup.html',
      controller: 'UserController as userCtrl'
    })

    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html'
    })

    .state('my-games', {
      url: '/my-games',
      templateUrl: 'templates/games/my-games.html',
      controller: 'MyGamesController as myGamesCtrl'
    })

    .state('new-game', {
      url: '/new-game',
      templateUrl: 'templates/games/new.html',
      controller: 'NewGameController as NewGameCtrl'
    })

    .state('new-play', {
      url: '/new-play/:id',
      templateUrl: 'templates/play/new-play.html',
      controller: 'NewPlayController as NewPlayCtrl'
    })

    .state('play-detail', {
      url: '/play/:id',
      templateUrl: 'templates/plays/play-detail.html',
      controller: 'PlayDetailController as PlayDetailCtrl'
    })

    .state('play-edit', {
      url: '/play-edit/:id',
      templateUrl: 'templates/plays/edit.html',
      controller: 'PlayEditController as PlayEditCtrl'
    })

    .state('game-detail', {
      url: '/game-detail/:id',
      templateUrl: 'templates/games/detail.html',
      controller: 'GameDetailController as GameDetailCtrl'
    })

  $urlRouterProvider.otherwise('/home');
}
