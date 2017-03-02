angular.module('app')
  .factory('GameDatabase', GameDatabase);

GameDatabase.$inject = ['$resource'];

function selectSchool(selSchool) {
   // get school from my api
   var school = selSchool;

   // the api will create school if doesn't exist
   return $q(function(resolve, reject) {
     School.get({schoolId: school.id}).$promise.then(function(s) {
       selectedSchool = s;
       resolve(s);
     }).catch(function(err) {
       School.save({
         // keys map to your mongoose model
         // values map to selSchool
         name: school['school.name'],
         schoolId: school.id,
         schoolWebsite: school['school.school_url']
       }, function(newSchool) {
         selectedSchool = newSchool;
         resolve(newSchool);
       });
     });
   });
 }
