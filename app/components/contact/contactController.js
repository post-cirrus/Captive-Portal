(function() {
  'use strict';

  angular.module("app").controller("ContactCtrl", ContactCtrl);

  function ContactCtrl($log) {
    var vm = this;
    vm.contactMe = "contact message";
    $log.debug("ContactCtrl reports for duty");
  }

})();
