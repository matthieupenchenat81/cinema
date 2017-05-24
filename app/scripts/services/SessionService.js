(function () {
    'use strict';

    angular.module('cinemaApp')
        .factory('SessionService', ["$window",
            function ($window) {

                // ---------------------------------------------------------------------------
                // PUBLIC API.
                // ---------------------------------------------------------------------------
                return ({
                    getScenes: getScenes,
                    storeScenes: storeScenes,
                    removeScenes: removeScenes,

                    getMovies: getMovies,
                    storeMovies: storeMovies,
                    removeMovies: removeMovies,

                    getMonuments: getMonuments,
                    storeMonuments: storeMonuments,
                    removeMonuments: removeMonuments
                });

                // ---------------------------------------------------------------------------
                // PUBLIC METHODS.
                // ---------------------------------------------------------------------------

                function storeScenes(scenes) {
                    $window.sessionStorage.scenes = JSON.stringify(scenes);
                }

                function getScenes() {
                    var scenes = $window.sessionStorage.scenes;
                    return (!scenes) ? null : JSON.parse($window.sessionStorage.scenes);
                }

                function removeScenes() {
                    delete $window.sessionStorage.scenes;
                }

                function storeMovies(movies) {
                    $window.sessionStorage.movies = JSON.stringify(movies);
                }

                function getMovies() {
                    var movies = $window.sessionStorage.movies;
                    return (!movies) ? null : JSON.parse($window.sessionStorage.movies);
                }

                function removeMovies() {
                    delete $window.sessionStorage.movies;
                }

                function storeMonuments(monuments) {
                    $window.sessionStorage.monuments = JSON.stringify(monuments);
                }

                function getMonuments() {
                    var monuments = $window.sessionStorage.monuments;
                    return (!monuments) ? null : JSON.parse($window.sessionStorage.monuments);
                }

                function removeMonuments() {
                    delete $window.sessionStorage.monuments;
                }
                
                // ---------------------------------------------------------------------------
                // PRIVATE METHODS.
                // ---------------------------------------------------------------------------

            }
        ]);

})();