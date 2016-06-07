(function() {
  'use strict';

    angular.module("app").controller("UserCtrl", UserCtrl);

    function UserCtrl($rootScope, $cookieStore, $location, $window, $log, $injector, AuthenticationService) {

      $log.debug("UserCtrl reporting for duty.");

      var vm = this;
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        vm.currentUser = $rootScope.globals.currentUser;
      }


      // If user already logged in, just redirect to account page
      vm.checkIfLoggedIn = function() {
        $log.debug("UserCtrl::checkIfLoggedIn - Verify if user is already logged in ...");
        if ($rootScope.globals.currentUser) {
          $log.debug("UserCtrl::checkIfLoggedIn - User already logged in->redirect to account page");
          $location.path("/account");
        }
      }


      // Login function : it must pass the credentials to login service where the busines logic is done.
      // Depending on result, we log the user or display an error message
      vm.login = function() {

        $log.debug("UserCtrl::login function.");
        vm.checkIfLoggedIn();

        var response = AuthenticationService.Login(vm.inputEmail, vm.inputPassword, function(response){

          if (response.success) {
            AuthenticationService.SetCredentials(vm.inputEmail, vm.inputPassword);

            var landingUrl = "http://" + $window.location.host + "/";
            $window.location.href = landingUrl;

          } else {

            vm.error = response.message;
          }
        });
      };


      // Logout function
      vm.logout = function() {
        $log.debug("UserCtrl::logout function.");
        AuthenticationService.ClearCredentials();

        var landingUrl = "http://" + $window.location.host + "/";
        $window.location.href = landingUrl;
      };



      // register function
      vm.register = function() {
        $log.debug("UserCtrl::register function.");
        vm.checkIfLoggedIn();

        if (!vm.registerForm.$valid) {
          $log.debug("UserCtrl::register - Form is invalid - probably passowrd do not match. pwCheck directive says it.");
          vm.error = "Form is invalid ... probably passwords do not match";

        } else {
          vm.error = "";
          AuthenticationService.RegisterAccount(vm.inputEmail, vm.inputPassword1, function(response) {

            if (response.success) {
              $log.debug("UserCtrl::register - Account creation success, now tring to log in ....");

              vm.login();

            } else {
              $log.debug("UserCtrl::register - Got a response failure from auth service");
              vm.error = "WEBSERVICE GOT WRONG F**K";
            }
          });

        }
      }
    };

})();
