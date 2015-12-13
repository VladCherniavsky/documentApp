'use strict';
(function () {
    angular
        .module('document')
        .service('userLoginService',['$http', userLoginService]);

    function userLoginService ($http) {
        this.checkLoginUser = function (user) {
            return $http({
                method: 'POST',
                url: '/api/user/login',
                data: user,
            }).then(function(res){
                return res.data;
            }).catch(function(reject) {
                throw reject;
            });
        };
    }

})();