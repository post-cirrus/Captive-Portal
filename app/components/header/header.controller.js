(function() {
  'use strict';

  angular.module("app").controller("HeaderCtrl", HeaderCtrl);

  function HeaderCtrl($rootScope, $cookieStore, $log, ngToast) {

    $log.debug("HeaderCtrl reporting for duty.");

    var vm = this;
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      vm.currentUser = $rootScope.globals.currentUser;
    }
  }

  })();
