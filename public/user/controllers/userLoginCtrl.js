'use strict';
(function () {
    angular
        .module('document')
        .controller('userLoginCtrl',['userLoginService', '$rootScope', '$state', '$log','growl', userLoginCtrl]);

    function userLoginCtrl (userLoginService, $rootScope, $state, $log, growl) {
        var self = this;

        this.loginUser = function (user, isvalid) {
            if (isvalid) {

                userLoginService.checkLoginUser(user).then(function(resCheckLoginUser){
                    $rootScope.userSession = resCheckLoginUser;
                    if(resCheckLoginUser.access === 'director'){
                        $state.go('director');
                    }
                    if(resCheckLoginUser.access === 'admin'){
                        $state.go('admin');
                    }
                    if(resCheckLoginUser.access === 'manager'){
                        $state.go('manager');
                    }
                    if(resCheckLoginUser.access === 'staff'){
                        $state.go('staff');
                    }

                    growl.success('Registration success', {title: 'Seccess!'});
                }).catch(function(rej){
                    $rootScope.userSession = null;
                    $log.debug('userLoginCtrl: loginUser: checkLoginUser: ERROR rej');
                    $log.debug(rej);
                    if(rej.statusText === 'Unauthorized'){
                        growl.warning('Write valid login and password', {title: 'Not valid data!'});
                    }else{
                        growl.error('This adds a error message', {title: 'ALERT WE GOT ERROR'});
                    }
                });
            }
            else {
                growl.warning('Please fill in the input field', {title: 'Warning!'});
            }
        };
    }

})();