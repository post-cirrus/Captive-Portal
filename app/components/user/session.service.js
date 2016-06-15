(function() {
  'use strict';

  angular.module("app").service("SessionService", SessionService);

  function SessionService($rootScope, $log, $cookieStore) {

    $log.log("SessionService reporting for duty.");

    var service = {};
    service.pushSession = pushSession;
    return service;

    function pushSession(scope) {
      $log.debug("SessionService::pushSession - Check if user is logged in and push currentUser in contoller");

      // Read cookie, and push current user in rootscope
     $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        scope.currentUser = $rootScope.globals.currentUser;
      }
    }
  }


  })();
