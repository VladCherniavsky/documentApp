'use strict';
(function () {
    angular
        .module('document')
        .service('adminService',['$http','$log', adminService]);

    function adminService ($http, $log) {
        this.postRegistrationUser = function (user) {
            return $http({
                method: 'POST',
                url: '/api/user/registration',
                data: user
            }).then(function(res){
                return res;
            }).catch(function(reject) {
                throw reject;
            });
        };
        this.getAllUsers = function() {
            return $http({
                method: 'GET',
                url: '/api/user/users'
            }).then(function(res){
                $log.info(res);
                return res.data.users;
            }).catch(function(reject) {
                throw reject;
            });
        };
        this.deleteUser = function(userId) {
            return $http({
                method: 'DELETE',
                url: '/api/user/'+userId
            }).then(function(res){
                return res;
            }).catch(function(reject) {
                throw reject;
            });
        };
        this.editUser = function(userId, userDetails) {
            return $http({
                method: 'PUT',
                url: '/api/user/'+userId,
                data: userDetails
            }).then(function(res){
                $log.info('userDetails');
                $log.info(userDetails);
                $log.info('userId');
                $log.info(userId);
                return res;
            }).catch(function(reject) {
                throw reject;
            });
        };
    }

})();