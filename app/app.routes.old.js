(function() {
  'use strict';

  angular.module("app").config(routeInitFunc);

  function routeInitFunc($routeProvider, $locationProvider) {

    // log service not yet instantiated in config phase of "app" module.
    // This a trick to access it even tho
    var $log =  angular.injector(['ng']).get('$log')

    $log.debug("Configuring route provider");

    $routeProvider
    .when("/", {
      templateUrl : "app/components/home/home.view.html"
    })
    .when("/contact", {
      templateUrl : "app/components/contact/contact.view.html"
    })
    .when("/login", {
      templateUrl : "app/components/user/login.view.html"
    })
    .when("/register", {
      templateUrl : "app/components/user/register.view.html"
    })
    .when("/account", {
      templateUrl : "app/components/user/account.view.html"
    })
    .when("/plans", {
      templateUrl : "app/components/plan/plans.view.html"
    })

    // Error
    .otherwise(
      {
        templateUrl: "app/components/404/404.view.html"
      });


      //TODO : Need url rewrite to make html5 mode enabled
      /*
      //check browser support
       if(window.history && window.history.pushState){
         // $locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
         // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
         // if you don't wish to set base URL then use this
        $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
         });
       }*/

      //$log.debug("End of Configuring route provider");
    }

  })();
