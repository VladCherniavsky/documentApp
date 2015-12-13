'use strict';
(function () {
    angular
        .module('document')
        .service('sessionUserService',['$http', sessionUserService]);

    function sessionUserService ($http) {
        this.getSessionUser = function() {
            return $http({
                method: 'GET',
                url: '/api/user/me'
            }).then(function(res){
                return res.data;
            }).catch(function(reject) {
                throw reject;
            });
        };

        this.logoutSessionUser = function() {
            return $http({
                method: 'GET',
                url: '/api/user/logout'
            }).then(function(res){
                return res;
            }).catch(function(reject) {
                throw reject;
            });
        };
    }

})();