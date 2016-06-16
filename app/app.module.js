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
  .constant('API', 'http://test-routes.herokuapp.com')
  .run(function($log, API) {
    $log.debug("App now running : "+API);
  });

})();
