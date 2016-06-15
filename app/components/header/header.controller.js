(function() {
  'use strict';

  angular.module("app").controller("HeaderCtrl", HeaderCtrl);

  function HeaderCtrl($rootScope, $cookieStore, $log, ngToast, SessionService) {

    $log.debug("HeaderCtrl reporting for duty.");

    var vm = this;
    SessionService.pushSession(vm);

  }

  })();
