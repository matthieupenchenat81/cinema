(function () {
    'use strict';

    angular.module('cinemaApp')
        .factory('DataService', ['$http',
            function ($http) {

                var apiServer = 'http://0.0.0.0:3000';

                // ---------------------------------------------------------------------------
                // PUBLIC API.
                // ---------------------------------------------------------------------------
                return ({
                    getScenes: getScenes
                });

                function getScenes() {
                    var request = $http.get(apiServer + '/scenes');
                    return request.then(handleSuccess);
                }

                // private functions
                function handleSuccess(response) {
                    return (response && response.data && response.data.results && response.data.results.bindings)?response.data.results.bindings:[];  
                }
            }]);
})();