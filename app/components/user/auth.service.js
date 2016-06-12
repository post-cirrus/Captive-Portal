(function() {
  'use strict';

  angular.module("app").service("AuthenticationService", AuthenticationService);

  function AuthenticationService($rootScope, $http, $timeout, $log, $cookieStore) {

    $log.log("AuthenticationService reporting for duty.");

    var service = {};
    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;
    service.RegisterAccount = RegisterAccount;
    service.Base64 = Base64;
    return service;


    // Login function : the business logic to verify if account exists and is valid
    function Login(email, password, callback) {
      $log.debug("AuthenticationService::Login - Receive login request with email:" + email);

      // Dummy authentication
      $timeout(function(){
        var response = { success: email == 'test@test.test' && password === 'test' };

        if(response.success) {
          $log.debug("AuthenticationService::Login - login success");
        } else {
          $log.debug("AuthenticationService::Login - login incorrect");
          response.message = 'Username or password is incorrect';
        }
        callback(response);
      }, 1000);

      /* Use this for real authentication
      ----------------------------------------------*/
      //$http.post('/api/authenticate', { username: username, password: password })
      //    .success(function (response) {
      //        callback(response);
      //    });
    }


    // SetCredentials is in charge of setting the user session into a cookie
    function SetCredentials(email, password) {
      $log.debug("AuthenticationService::SetCredentials - Received set credentials call");

      var authdata = Base64().encode(email + ':' + password);

      $rootScope.globals = {
        currentUser: {
          email: email,
          authdata: authdata
        }
      };

      $http.defaults.headers.common['Authorization'] = 'Basic' + authdata;
      $cookieStore.put('globals', $rootScope.globals);

      $log.debug("AuthenticationService::SetCredentials - session set");
    }


    // ClearCredentials is in charge of clearing the user session from cookie store
    function ClearCredentials() {
      $log.debug("AuthenticationService::ClearCredentials - Received clear credentials call");

      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic ';

      $log.debug("AuthenticationService::ClearCredentials - session cleared");
    }



    function RegisterAccount(email, password, callback) {
      $log.debug("AuthenticationService::RegisterAccount - Account creation request with email : "+email);

      // Dummy registration
      $timeout(function(){
        var response = { success: email == 'test@test.test' };
        if(!response.success) {
          response.message = 'Error during user creation. Please try again later';
          $log.debug("AuthenticationService::RegisterAccount - error during user creation");
        } else {
          $log.debug("AuthenticationService::RegisterAccount - user creation success");
        }
        callback(response);
      }, 1000);
    }




    // Base64 hash method
    function Base64() {
      /* jshint ignore:start */
      var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

      return {
        encode: function (input) {
          var output = "";
          var chr1, chr2, chr3 = "";
          var enc1, enc2, enc3, enc4 = "";
          var i = 0;

          do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }

            output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
          } while (i < input.length);

          return output;
        },

        decode: function (input) {
          var output = "";
          var chr1, chr2, chr3 = "";
          var enc1, enc2, enc3, enc4 = "";
          var i = 0;

          // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
          var base64test = /[^A-Za-z0-9\+\/\=]/g;
          if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
          }
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

          do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

          } while (i < input.length);

          return output;
        }
      };
    }

  }

})();
