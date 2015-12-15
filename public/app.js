'use strict';
angular.module('document', ['ui.router','ngMessages','angular-growl','ngFileUpload'])
    .controller('mainCtrl',['$scope', 'sessionUserService','$log','$rootScope','$state', mainCtrl])
    .config(['growlProvider', growlProvider ]);

function growlProvider(growlProvider){
    growlProvider.globalTimeToLive(3000);
}

function mainCtrl ($scope, sessionUserService, $log, $rootScope, $state){
    $scope.userLogout = function(){
        sessionUserService.logoutSessionUser().then(function(){
            $rootScope.userSession = null;
            $state.go('loginUser');
        }).catch(function(rej){
            $log.debug('mainCtrl: userLogout: logoutSessionUser: ERROR rej');
            $log.debug(rej);
            $rootScope.userSession = null;
        });
    };

    $scope.checkUserAuthBtn = function () {
        return !!(($rootScope.userSession) && ($rootScope.userSession.userSessionId) && ($rootScope.userSession !== null));
    };
}