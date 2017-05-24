'use strict';

/**
 * @ngdoc function
 * @name cinemaApp.controller:VisitCtrl
 * @description
 * # VisitCtrl
 * Controller of the cinemaApp
 */
angular.module('cinemaApp')
    .controller('VisitCtrl', function ($scope, $state, $mdSidenav, SessionService, DataService, $stateParams, $timeout, $rootScope) {

        var movieTitle,
            filmIcon, monumentIcon;

        init();

        // Public functions -------------

        // Private functions ------------

        function init() {

            // marker icon
            filmIcon = {
                iconUrl: 'images/icons/clapboard.png',
                iconSize: [40, 40],
                iconAnchor: [40, 40],
            };

            monumentIcon = {
                iconUrl: 'images/icons/flower.png',
                iconSize: [40, 40],
                iconAnchor: [40, 40]
            };

            var movieId = $stateParams.movieId;
            if (movieId) {
                // find movie detail
                movieTitle = decodeURI($stateParams.movieId);
            }

            // Retrieve all scenes
            var scenes = [];
            loadScenes().then(function name(_scenes) {
                scenes = formatScenes(_scenes);
                if (movieId) {
                    scenes = scenes.filter(filterByMovieTitle);

                    // update leaflet center map point
                    $rootScope.center = getCenter(scenes);
                    loadMarkers(scenes);

                    $scope.movieInfo = getMovieInfo(scenes);
                }
            });

            //retrieve all monuments
            var monuments = [];
            loadMonuments().then(function (_monuments) {
                monuments = formatMonuments(_monuments);
                console.log(monuments[0]);
                // if () {
                //   monuments = monuments.filter(filterByMovieTitle);

                // update leaflet center map point
                // $rootScope.center = getCenter(monuments);
                loadMarkersM(monuments);

                $scope.monumentInfo = getMonumentInfo(monuments);
                // }
            });

        }

        function formatScenes(scenes) {
            return scenes.map(function (scene) {
                return {
                    address: scene.address.value,
                    geoPoints: JSON.parse(scene.geoPoints.value),
                    dateTournage: scene.dateTournage.value,
                    labelFilm: scene.labelFilm.value,
                    nomRealisateur: scene.nomRealisateur.value,
                    nomVille: scene.nomVille.value
                };
            });
        }

        function formatMonuments(monuments) {
            return monuments.map(function (monument) {
                return {
                    appellationC: monument.appellationC.value,
                    archi: monument.archi.value,
                    periodeConstruction: monument.periodeConstruction.value,
                    coordonneesGps: monument.coordonneesGps.value
                };
            });
        }

        function loadMarkers(scenes) {

            $rootScope.markers = {};
            scenes.forEach(function (scene, index) {
                if (scene.geoPoints && scene.geoPoints.lat && scene.geoPoints.lng) {

                    var marker = {
                        lat: parseFloat(scene.geoPoints.lat),
                        lng: parseFloat(scene.geoPoints.lng),
                        message: "Adresse : " + scene.address + "<br>Date de tournage : " + scene.dateTournage,
                        focus: false,
                        draggable: false,
                        icon: filmIcon
                    };
                    $rootScope.markers[index] = marker;
                }
            });
        }

        function loadMarkersM(monuments) {

            if (!$rootScope.markers) {
                $rootScope.markers = {};
            }
            monuments.forEach(function (monument, index) {
                if (monument.coordonneesGps) {
                    var coordGps = monument.coordonneesGps.split(","),
                    message = (monument.appellationC !== 'undefined')? "Nom : " + monument.appellationC:'';
                    message += (monument.archi !== 'undefined')? "<br>Architecte : " + monument.archi:'';
                    message += (monument.periodeConstruction !== 'undefined')? "<br>Période de construction : " + monument.periodeConstruction:"";
                    var marker = {
                        lat: parseFloat(coordGps[0]),
                        lng: parseFloat(coordGps[1]),
                        message: message,
                        focus: false,
                        draggable: false,
                        icon: monumentIcon
                    };
                    $rootScope.markers[""+index+"monument"] = marker;
                }
            });
        }

        function loadScenes() {
            var scenes = SessionService.getScenes();
            if (scenes) return Promise.resolve(scenes);
            else return DataService.getScenes().then(function (_scenes) {
                SessionService.storeScenes(_scenes);
                return Promise.resolve(_scenes);
            });
        }

        function loadMonuments() {
            var monuments = SessionService.getMonuments();
            if (monuments) return Promise.resolve(monuments);
            else return DataService.getMonuments().then(function (_monuments) {
                SessionService.storeMonuments(_monuments);
                return Promise.resolve(_monuments);
            });
        }

        function filterByMovieTitle(item) {
            return (item.labelFilm === movieTitle.toUpperCase());
        }

        function getCenter(scenes) {
            var numberOfScenes = scenes.length;

            if (numberOfScenes === 1) {
                return {
                    lat: parseFloat(scenes[0].geoPoints.lat),
                    lng: parseFloat(scenes[0].geoPoints.lng),
                    zoom: 13
                };
            }

            var meanLat = scenes.reduce(function (previous, current) {
                var previousLat = parseFloat((typeof previous === 'object') ? previous.geoPoints.lat : previous);
                return previousLat + parseFloat(current.geoPoints.lat);
            }) / numberOfScenes,
                meanLng = scenes.reduce(function (previous, current) {
                    var previousLng = parseFloat((typeof previous === 'object') ? previous.geoPoints.lng : previous);
                    return previousLng + parseFloat(current.geoPoints.lng);
                }) / numberOfScenes;

            return {
                lat: meanLat,
                lng: meanLng,
                zoom: 12
            };
        }

        function getMovieInfo(scenes) {
            return {
                title: scenes[0].labelFilm,
                director: scenes[0].nomRealisateur,
                city: scenes[0].nomVille,
                numberOfScenes: scenes.length
            };
        }

        function getMonumentInfo(monuments) {
            return {
                construction: monuments[0].periodeConstruction,
                architecte: monuments[0].archi
            };
        }
    });
