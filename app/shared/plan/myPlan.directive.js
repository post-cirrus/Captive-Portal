(function() {
  'use strict';

  angular.module('app')
  .directive('myPlan', function() {
    return {
        templateUrl: 'app/shared/plan/myPlan.html',
        link: function ($scope, element, attrs) { }
    }
  });


})();
