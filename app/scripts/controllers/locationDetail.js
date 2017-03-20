'use strict';

/**
 * @ngdoc function
 * @name cinemaApp.controller:LocationDetailCtrl
 * @description
 * # LocationDetailCtrl
 * Controller of the cinemaApp
 */
angular.module('cinemaApp')
  .controller('LocationDetailCtrl', function ($scope, $state) {

    angular.extend($scope, {
      goBackToVisit
    });

    init();

    // Public functions ------------

    function goBackToVisit() {
      $state.go('visit');
    }

    // Private functions ------------

    function init() {

      // TODO
    }

  });
