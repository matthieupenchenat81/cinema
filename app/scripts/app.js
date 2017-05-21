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
    'ngMaterial',
    'ui.router',
    'ngMdIcons',
    'leaflet-directive'
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
        })

        .state('visit', {
            url: '/balade',
            templateUrl: 'views/visit.html'
            //controller: 'VisitCtrl'
        })

        .state('visit.monument', {
            url: '/monument/{monumentId}',
            templateUrl: 'views/detailMonument.html',
            controller: 'VisitCtrl'
        })

        .state('visit.movie', {
            url: '/film/{movieId}',
            templateUrl: 'views/detailFilm.html',
            controller: 'VisitCtrl'
        });
})

    .run(['$rootScope', function ($rootScope) {
        angular.extend($rootScope, {
            center: {
                lat: 48.853,
                lng: 2.35,
                zoom: 7
            },
            markers: {},
        });
    }]);
