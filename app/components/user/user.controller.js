(function() {
  'use strict';

    angular.module("app").controller("UserCtrl", UserCtrl);

    function UserCtrl($rootScope, $cookieStore, $location, $window, $log, $injector, $route, $templateCache, ngToast, AuthenticationService) {

      $log.debug("UserCtrl reporting for duty.");

      var vm = this;

      // Read cookie, and push current user in rootscope
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        vm.currentUser = $rootScope.globals.currentUser;
      }

      // Generic method to check if user already logged in, and if yes just redirect to account page
      vm.checkIfLoggedIn = function() {
        $log.debug("UserCtrl::checkIfLoggedIn - Verify if user is already logged in ...");
        if ($rootScope.globals.currentUser) {
          $log.debug("UserCtrl::checkIfLoggedIn - User already logged in->redirect to account page");
          $location.path("/account");
        } else {
          $log.debug("UserCtrl::checkIfLoggedIn - User not logged in " + $location.path());
          if ($location.path() != "/login" && $location.path() != "/register") {
            $location.path("/login");
          }
        }
      }

      // Overall check if user is logged in and redirect to account page
      vm.checkIfLoggedIn();


      // Login function : it must pass the credentials to login service where the busines logic is done.
      // Depending on result, we log the user or display an error message
      vm.login = function() {

        $log.debug("UserCtrl::login function.");
        vm.checkIfLoggedIn();

        var response = AuthenticationService.Login(vm.inputEmail, vm.inputPassword, function(response){

          if (response.success) {
            AuthenticationService.SetCredentials(vm.inputEmail, vm.inputPassword);
            ngToast.success("Successfully logged in !");

            /*var landingUrl = "http://" + $window.location.host + "/";
            $window.location = landingUrl;*/
            //$location.path("/");
            //var currentPageTemplate = $route.current.templateUrl;
            //$templateCache.remove(currentPageTemplate);
            $route.reload();

          } else {
            ngToast.danger("Error ! "+response.message);
          }
        });
      };


      // Logout function
      vm.logout = function() {
        $log.debug("UserCtrl::logout function.");
        AuthenticationService.ClearCredentials();

        ngToast.success("Successfully logged out !");

        //var landingUrl = "http://" + $window.location.host + "/";
        //$window.location.href = landingUrl;
        $route.reload();

      };



      // register function
      vm.register = function() {
        $log.debug("UserCtrl::register function.");
        vm.checkIfLoggedIn();

        if (!vm.registerForm.$valid) {
          $log.debug("UserCtrl::register - Form is invalid - probably passowrd do not match. pwCheck directive says it.");
          ngToast.danger("Form is invalid ... probably passwords do not match");

        } else {
          AuthenticationService.RegisterAccount(vm.inputEmail, vm.inputPassword, function(response) {

            if (response.success) {
              $log.debug("UserCtrl::register - Account creation success, now tring to log in ....");
              vm.login();
              ngToast.success("Account successfully created !");

            } else {
              $log.debug("UserCtrl::register - Got a response failure from auth service");
              ngToast.danger("WEBSERVICE GOT WRONG F**K");
            }
          });

        }
      }

    };

})();
