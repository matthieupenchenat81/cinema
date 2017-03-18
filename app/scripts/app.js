'use strict';

/**
 * @ngdoc overview
 * @name cinemaApp
 * @description
 * # cinemaApp
 *
 * Main module of the application.
 */
var app = angular.module('cinemaApp', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]);

app.config(function ($stateProvider, $urlRouterProvider) {

        //Set default route
        $urlRouterProvider.otherwise('/accueil');

        //Common state
        $stateProvider

        // Common state ------------------------------------------------------------------
        .state('home', {
            url: '/accueil',
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        });
    });