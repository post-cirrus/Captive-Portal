;(function() {
'use strict';

angular.module("app").controller('UserCtrl', UserCtrl);

/**
  This controller is to be used on views where user is :
    - invited to login or logout
*/
function UserCtrl(user, auth, $log, $state, ngToast) {
  var self = this;


  $log.debug("UserCtrl::Reporting for duty");

  function successCallback(res) {
    var token = res.data ? res.data.token : null;
    if(token) { console.log('JWT:', token); }
    self.message = res.data.message;
  }
  function errorCallback(res) {
    $log.debug("UserCtrl::errorCallback -- "+res.statusText);
    ngToast.danger("Error ! "+res.statusText);

    switch(res.status) {
      case 401:
        $state.go("app.login");
        break;
      default:
        break;
    }
  }
  self.login = function() {
    user.login(self.email, self.password)
      .then(function(res) {
        ngToast.success("Success ! You are now logged in");
        $log.debug("UserCtrl::login -- User now logged in");
        successCallback(res);
      }, errorCallback)
  }
  self.register = function() {
    user.register(self.email, self.password)
      .then(function(res) {
        ngToast.success("Success ! You are now registered");
        $log.debug("UserCtrl::login -- User is now registered");
        successCallback(res);
      }, errorCallback)
  }
  self.getQuote = function() {
    user.getQuote()
      .then(successCallback, errorCallback)
  }
  self.logout = function() {
    auth.logout && auth.logout()
  }
  self.isAuthed = function() {
    return auth.isAuthed ? auth.isAuthed() : false
  }

  self.isLoggedIn = self.isAuthed();

}

})();
