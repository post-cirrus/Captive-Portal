(function() {
  'use strict';

  angular.module("app", ["ngRoute", "ngCookies", "logToServer", "ngToast"])
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
  .run(function($log) {
    $log.debug("App now running");
  });

})();
