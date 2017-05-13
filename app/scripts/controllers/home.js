'use strict';

/**
 * @ngdoc function
 * @name cinemaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cinemaApp
 */
angular.module('cinemaApp')
  .controller('HomeCtrl', function ($scope, $state, DataService) {

    angular.extend($scope, {
      showMovieDetail
    });

    init();

    // Public functions ------------

    function showMovieDetail() {
      $state.go('visit');
    }

    // Private functions ------------

    function init() {

      $scope.center = {
        lat: 48.853,
        lng: 2.35,
        zoom: 7
      };

      $scope.defaults = {
        scrollWheelZoom: false,
        zoomControl: false
      };

      DataService.getScenes().then(function(data) {
        console.log(data);
      }).catch(function(err) {
        console.log(err);
      })
    }

  });
