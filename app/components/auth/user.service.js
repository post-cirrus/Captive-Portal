;(function() {
'use strict';

angular.module('app').service('user', userService);

function userService($http, API) {
  var self = this;

  self.getQuote = function() {
    return $http.get(API + '/auth/quote')
  };

  self.register = function(username, password) {
    return $http.post(API + '/auth/register', {
      username: username,
      password: password
    })
  };

  self.login = function(username, password) {
    return $http.post(API + '/auth/login', {
      username: username,
      password: password
    })
  };
}

})();
