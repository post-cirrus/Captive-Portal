;(function() {
'use strict';

  angular.module("app").controller('AccountCtrl', AccountCtrl);

  function AccountCtrl(user, auth, $log, $state, ngToast) {
    var self = this;

    user.getQuote().then(function(res) {
      self.message = res.data.message;
    });
  }

})();
