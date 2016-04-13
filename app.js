// public/app.js
var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.run(['$http','$rootScope','$cookieStore', function($http,$rootScope,$cookieStore) {
  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  }
  $rootScope.whatever ="what";
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

  // Controllers
  app.controller("MainCtrl", function ($scope, $rootScope, $http, $location, $cookieStore, $window, AuthenticationService) {
    console.log("MainCtrl reporting for duty.");
    $scope.welcome = "Hello word, welcome on board";

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      $scope.email = $rootScope.globals.currentUser.email;
    } else {
      $location.path('/login');
    }

    // send login state to scope
    if ($rootScope.globals.currentUser) {
      $scope.isLoggedIn = true;
    } else {
      $scope.isLoggedIn = false;
    }

    $scope.logout = function() {
      AuthenticationService.ClearCredentials();
      var landingUrl = "http://" + $window.location.host + "/";
      $window.location.href = landingUrl;
    }

  });

  app.controller("LoginCtrl", function ($scope, $window, AuthenticationService) {
    console.log("LoginCtrl reporting for duty.");

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



  });

  app.controller("AccountCtrl", function ($scope, $rootScope, $location) {
    console.log("AccountCtrl reporting for duty.");

    if (!$rootScope.globals.currentUser) {
      $location.path('/login');
    } else {
      $scope.yourname = $rootScope.globals.currentUser.email;
    }

  });


  app.controller("RegisterCtrl", function ($scope, $rootScope, $location, AuthenticationService) {
    console.log("RegisterCtrl reporting for duty.");

    if ($rootScope.globals.currentUser) {
      $location.path('/account');
    }



    $scope.createAccount = function() {
      if (!$scope.registerForm.$valid) {
        $scope.errorMessage = "Form is invalid";
      } else {
        $scope.errorMessage = "";
        AuthenticationService.RegisterAccount($scope.inputEmail, $scope.inputPassword, function(response) {
          if (response.success) {
            $scope.errorMessage = "Account creation success";
            $location.path('/');
          } else {
            $scope.errorMessage = "WEBSERVICE GOT WRONG F**K";
          }
        });

      }
    }

  });
