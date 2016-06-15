(function() {
  'use strict';

  angular.module("app").config(routeInitFunc);

  function routeInitFunc($stateProvider, $urlRouterProvider) {

    // log service not yet instantiated in config phase of "app" module.
    // This a trick to access it even tho
    var $log =  angular.injector(['ng']).get('$log')

    $log.debug("Configuring route provider");

    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("app", {
      url: "/",
      views: {
        "header": {
          templateUrl: "app/components/header/header.view.html"
        },
        "content": {
          templateUrl : "app/components/home/home.view.html"
        },
        "footer": {
          templateUrl: "app/components/footer/footer.view.html"
        }
      }
    })
    .state("app.login", {
      url: "/login",
      views: {
        "content@": {
          templateUrl : "app/components/user/login.view.html"
        }
      }
    })
    .state("app.register", {
      url: "/register",
      views: {
        "content@": {
          templateUrl : "app/components/user/register.view.html"
        }
      }
    })
    .state("app.account", {
      url: "/account",
      views: {
        "content@": {
          templateUrl : "app/components/user/account.view.html"
        }
      }
    })
    .state("app.plan", {
      url: "/plan",
      views: {
        "content@": {
          templateUrl : "app/components/plan/plan.view.html"
        }
      }
    })
    .state("app.contact", {
      url: "/contact",
      views: {
        "content@": {
          templateUrl : "app/components/contact/contact.view.html"
        }
      }
    });

    $log.debug("End of Configuring route provider");
  }

})();
