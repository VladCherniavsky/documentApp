'use strict';
(function () {
    angular
        .module('document')
        .run(['$state', '$rootScope', '$log', 'sessionUserService', runPage]);

    function runPage($state, $rootScope, $log, sessionUserService){
        $rootScope.userSession = null;
        function SessionUser(){
            sessionUserService.getSessionUser().then(function (resUserSession) {
                $rootScope.userSession = resUserSession;
            }).catch(function(rej){
                $rootScope.userSession = null;
                $log.debug('runPage: SessionUser() getSessionUser  ERROR rej');
                $log.debug(rej);
            }).then(function(){
                $rootScope.$on( '$stateChangeStart', function(e, toState) {
                    if((toState.needAuth === true)&&($rootScope.userSession === null)){
                        e.preventDefault();
                        $state.go('loginUser');
                    }
                });
            }).catch(function(rej){
                $log.debug('runPage: $stateChangeStart:  ERROR rej');
                $log.debug(rej);
            });
        }
        SessionUser();
    }

})();