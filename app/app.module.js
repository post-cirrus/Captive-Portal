(function() {
  'use strict';

  angular.module("app", ["ui.router", "ngCookies", "ngToast"])
  /*.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('logToServerInterceptor');
  }])*/
  .config(["ngToastProvider", function(ngToastProvider) {
    ngToastProvider.configure({
      animation: "fade", // slide or fade
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });
  }])
  .run(function($log, $rootScope, $cookieStore) {
    $log.debug("App now running");

    // Read cookie, and push current user in rootscope
    /*$rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $rootScope.currentUser = $rootScope.globals.currentUser;
    }*/

  });

})();
