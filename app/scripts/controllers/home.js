'use strict';

/**
 * @ngdoc function
 * @name cinemaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cinemaApp
 */
angular.module('cinemaApp')
  .controller('HomeCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    angular.extend($scope, {
      center: {
        lat: 48.853,
        lng: 2.35,
        zoom: 7
      }
    });

  });
