(function() {
  'use strict';

  angular.module("app", ["ngRoute"]).config(routeInitFunc);

  function routeInitFunc($routeProvider, $locationProvider) {

    // log service not yet instantiated in config phase of "app" module.
    // This a trick to access it even tho
    var $log =  angular.injector(['ng']).get('$log')

    $log.debug("Configuring route provider");

    $routeProvider
      .when("/", {
        templateUrl : "app/components/home/homeView.html"
      })
      .when("/contact", {
        templateUrl : "app/components/contact/contactView.html"
      })
      // Error
      .otherwise(
        {
          templateUrl: "app/components/404/404View.html"
        });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);

    $log.debug("End of Configuring route provider");
  }

})();
