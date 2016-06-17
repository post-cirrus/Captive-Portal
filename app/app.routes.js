;(function() {
  'use strict';

  angular.module("app").config(routeInitFunc);

  function routeInitFunc($stateProvider, $urlRouterProvider) {

    // log service not yet instantiated in config phase of "app" module.
    // This a trick to access it even tho
    var $log =  angular.injector(['ng']).get('$log')

    $log.debug("Configuring route provider");

    $urlRouterProvider.otherwise("/");

    $stateProvider

    // Public pages - authentication not required
    .state("app", {
      url: "/",
      views: {
        "header": {
          controller: "UserCtrl as vm",
          templateUrl: "app/components/header/header.view.html"
        },
        "content": {
          controller: "UserCtrl as vm",
          templateUrl : "app/components/home/home.view.html"
        },
        "footer": {
          templateUrl: "app/components/footer/footer.view.html"
        }
      }
    })
    .state("app.contact", {
      url: "/contact",
      views: {
        "content@": {
          controller: "ContactCtrl as vm",
          templateUrl : "app/components/contact/contact.view.html"
        }
      }
    })
    .state("app.login", {
      url: "/login",
      views: {
        "content@": {
          controller: "UserCtrl as vm",
          templateUrl : "app/components/auth/login.view.html"
        }
      }
    })
    .state("app.register", {
      url: "/register",
      views: {
        "content@": {
          controller : "UserCtrl as vm",
          templateUrl : "app/components/auth/register.view.html"
        }
      }
    })


    // Private pages - authentication required
    .state("app.account", {
      url: "/account",
      views: {
        "content@": {
          resolve: {
            authenticated : authenticationResolver
          },
          controller : "AccountCtrl as vm",
          templateUrl : "app/components/account/account.view.html"
        }
      }
    })
    .state("app.plan", {
      url: "/plan",
      views: {
        "content@": {
          resolve: {
            authenticated : authenticationResolver
          },
          controller : "UserCtrl as vm",
          templateUrl : "app/components/plan/plan.view.html"
        }
      }
    });

    $log.debug("End of Configuring route provider");
  }

  function authenticationResolver($log, user, ngToast, $state) {
    user.getQuote().then(
      function() {
        return true;
      }, function() {
        ngToast.danger("Error ! You are not logged in");
        $state.go("app.login");
        return false;
      });
    }

  })();
