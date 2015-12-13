'use strict';
(function () {
    angular
        .module('document')
            .config(['$stateProvider','$urlRouterProvider', configUser]);

    function configUser ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('loginUser');
        $stateProvider
            .state('loginUser', {
                url: '/loginUser',
                templateUrl: 'view/loginUser.html',
                controller:'userLoginCtrl',
                controllerAs:'userLogin',
                needAuth: false
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'view/adminPage.html',
                controller: 'adminCtrl',
                controllerAs: 'admin',
                needAuth: true
            })
            .state('director', {
                url: '/director',
                templateUrl: 'view/director.html',
                controller: 'directorCtrl',
                controllerAs: 'director',
                needAuth: true
            })
            .state('manager', {
                url: '/manager',
                templateUrl: 'view/manager.html',
                controller: 'managerCtrl',
                controllerAs: 'manager',
                needAuth: true
            })
            .state('staff', {
                url: '/staff',
                templateUrl: 'view/staff.html',
                controller: 'staffCtrl',
                controllerAs: 'staff',
                needAuth: true
            })
            .state('editUser', {
                url: '/editUser',
                templateUrl: 'view/editUser.html',
                controller: 'editUserCtrl',
                controllerAs: 'editUser',
                needAuth: true,
                params: {
                    'user': null
                }
            });

    }
})();