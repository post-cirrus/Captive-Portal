(function() {
  'use strict';

  angular.module("app", ["ngRoute"])
  .run(function() {
    $log.debug("App now running");
  });


})();
