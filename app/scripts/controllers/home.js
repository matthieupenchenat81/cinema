'use strict';

/**
 * @ngdoc function
 * @name cinemaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cinemaApp
 */
angular.module('cinemaApp')
  .controller('HomeCtrl', function ($scope, $state, DataService, SessionService) {

    angular.extend($scope, {
      showMovieDetail,
      querySearch
    });

    $scope.autocomplete = {};

    init();

    // Public functions ------------

    function showMovieDetail(selectedItem) {
      var movieId = encodeURI(selectedItem.display);
      $state.go('visit.movie', {movieId : movieId});
    }

    function querySearch(query) {
      return query ? $scope.movies.filter(createFilterFor(query)) : $scope.movies;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(movie) {
        return (movie.brutLabel.indexOf(lowercaseQuery) === 0);
      };
    }

    // Private functions ------------

    function init() {

      $scope.movies = [];
      var movies = SessionService.getMovies();
      if (!movies) {
        DataService.getMovies().then(function (_movies) {
          SessionService.storeMovies(_movies);
          $scope.movies = formatMovies(_movies);
        }).catch(function (err) {
          console.log(err);
        })
      } else {
        $scope.movies = formatMovies(movies);
      }

      $scope.center = {
        lat: 48.853,
        lng: 2.35,
        zoom: 7
      };

      $scope.defaults = {
        scrollWheelZoom: false,
        zoomControl: false
      };
    }

    function formatMovies(movies) {

      return movies.map(function (movie) {

        String.prototype.ucfirst = function () {
          return this.charAt(0).toUpperCase() + this.substr(1);
        }

        var labelFilm = angular.lowercase(movie.labelFilm.value).ucfirst(),
          idFilm = movie.idFilm.value,
          lowercaseLabel = angular.lowercase(movie.labelFilm.value);
        return {
          value: idFilm,
          display: labelFilm,
          brutLabel: lowercaseLabel
        };
      });
    }
  });
