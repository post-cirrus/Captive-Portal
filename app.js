// public/app.js
var app = angular.module('app', ['ngRoute', 'ngCookies', 'logToServer']);

app.run(['$http','$rootScope','$cookieStore', function($http,$rootScope,$cookieStore) {
  // keep user logged in after page refresh
/*  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  }
  $rootScope.whatever ="what";*/
}]);

// Directives
app.directive('pwCheck', function($parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {
          return $parse(attrs.pwCheck)(scope) === ctrl.$modelValue;
        }, function(currentValue) {
          ctrl.$setValidity('match', currentValue);
        });
    }
  }
});

// Route configuration
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  // Home
  .when("/",
  {
    templateUrl: "partials/home.html"
  })
  // Pages
  .when("/login",
  {
    templateUrl: "partials/login.html"
  })
  .when("/account",
  {
    templateUrl: "partials/account.html"
  })
  .when("/register",
  {
    templateUrl: "partials/register.html"
  })
  // Error
  .otherwise(
    {
      templateUrl: "partials/404.html"
    });
  }]);

  // Add logToServerInterceptor
  app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('logToServerInterceptor');
  }]);


  // Controllers
  app.controller("MainCtrl", function ($scope, $rootScope, $http, $location, $cookieStore, $window, $log, AuthenticationService) {
    $log.debug("MainCtrl reporting for duty.");

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      $scope.currentUser = $rootScope.globals.currentUser;
    }

  });


  app.controller("LoginCtrl", function ($scope, $window, $log, AuthenticationService) {
    $log.debug("LoginCtrl reporting for duty.");

    $scope.login = function() {
      $scope.dataLoading = true
      var response = AuthenticationService.Login($scope.inputEmail, $scope.inputPassword, function(response){
        if (response.success) {
          AuthenticationService.SetCredentials($scope.inputEmail, $scope.inputPassword);
          var landingUrl = "http://" + $window.location.host + "/";
          $window.location.href = landingUrl;

        } else {
          $scope.error = response.message;
          $scope.dataLoading = false;
        }
      });
    };

    $scope.logout = function() {
      AuthenticationService.ClearCredentials();
      //todo : add httpS support
      var landingUrl = "http://" + $window.location.host + "/";
      $window.location.href = landingUrl;
    }


  });

  app.controller("AccountCtrl", function ($scope, $rootScope, $log, $location) {
    $log.debug("AccountCtrl reporting for duty.");

    if (!$rootScope.globals.currentUser) {
      $location.path('/login');
    } else {
      $scope.yourname = $rootScope.globals.currentUser.email;
    }

  });


  app.controller("RegisterCtrl", function ($scope, $rootScope, $location, $window, $log, AuthenticationService) {
    $log.debug("RegisterCtrl reporting for duty.");

    if ($rootScope.globals.currentUser) {
      $location.path('/account');
    }



    $scope.register = function() {
      if (!$scope.registerForm.$valid) {
        $scope.errorMessage = "Form is invalid";
      } else {
        $scope.errorMessage = "";
        AuthenticationService.RegisterAccount($scope.inputEmail, $scope.inputPassword1, function(response) {

          if (response.success) {
            $scope.errorMessage = "Account creation success, now tring to log you in ...";
            AuthenticationService.Login($scope.inputEmail, $scope.inputPassword1, function(response) {
              if (response.success) {
                AuthenticationService.SetCredentials($scope.inputEmail, $scope.inputPassword1);
                var landingUrl = "http://" + $window.location.host + "/";
                $window.location.href = landingUrl;
              } else {
                $scope.errorMessage = "Login went wrong :/";
              }

            });

            // send an on-screen notification for redirection
            $location.path('/');
          } else {
            $scope.errorMessage = "WEBSERVICE GOT WRONG F**K";
          }
        });

      }
    }

  });
