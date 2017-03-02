angular.module('app')
  .factory('SearchService', searchService);

searchService.$inject = ['$http'];

function searchService($http) {
  var methods = {
    getResults: function(search, cb){
      $http({
        url: '/api/search',
        method: 'GET',
        params: {search: search}
      }).then(function(res){
        console.log(res);
        cb(res)
      }).catch(function(err){
        console.log(err);
        cb(err);
      })
    }
  }
  return methods;
}
