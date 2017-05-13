'use strict';

/**
 * @ngdoc function
 * @name cinemaApp.controller:VisitCtrl
 * @description
 * # VisitCtrl
 * Controller of the cinemaApp
 */
angular.module('cinemaApp')
    .controller('VisitCtrl', function ($scope, $state, $mdSidenav) {

        init();

        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        console.log("toggle " + navID + " is done");
                    });
            };
        }

        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };

        // Public functions -------------

        // Private functions ------------

        function init() {

            var filmIcon = {
                iconUrl: 'images/icons/filmreel.png',
                //shadowUrl: 'examples/img/leaf-shadow.png',
                iconSize: [40, 40],
                //shadowSize: [50, 64],
                iconAnchor: [40, 40],
                //shadowAnchor: [4, 62]
            },
                flowerIcon = {
                    iconUrl: 'images/icons/flower.png',
                    iconSize: [40, 40],
                    iconAnchor: [40, 40]
                }

            $scope.center = {
                lat: 48.853,
                lng: 2.35,
                zoom: 7
            };

            $scope.markers = {
                notredame: {
                    lat: 48.853,
                    lng: 2.35,
                    message: "I want to travel here!",
                    focus: false,
                    draggable: false,
                    icon: filmIcon
                },
                ruepierrerigaud: {
                    lat: 48.813646,
                    lng: 2.400513,
                    message: "I want to travel there!",
                    focus: false,
                    draggable: false
                },
                ruepierrerigaud2: {
                    lat: 48.813646,
                    lng: 2.500513,
                    message: "I want to travel there!",
                    focus: false,
                    draggable: false,
                    icon: flowerIcon
                }
            };

            $scope.defaults = {
                //scrollWheelZoom: false
            };
        }

    });
