(function() {
  'use strict';

  angular.module('app')
  .directive('pwCheck', function($parse) {
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


})();
