(function() {
  'use strict';

  angular.module("app", ["ngRoute", "ngCookies", "logToServer"])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('logToServerInterceptor');
  }])
  .run(function($log) {
    $log.debug("App now running");
  });

})();
