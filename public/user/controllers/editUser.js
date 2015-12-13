'use strict';
(function () {
    angular
        .module('document')
        .controller('editUserCtrl',['$log','$state','adminService', editUserCtrl]);

    function editUserCtrl($log, $state, adminService){
        this.userDetails = $state.params.user;

        $log.info($state.params);

        this.editShortLink = function (user) {
            var userDetails = {access: user.access};

            $log.info('userDetails');
            $log.info(userDetails);

            adminService.editUser(user._id, userDetails).then(function () {
                $state.go('admin');
            }).catch(function(rej){
                $log.debug('userPageEditLinkCtrl: editShortLink ERROR');
                $log.debug(rej);
            });
        };

        this.backOnUserPage = function () {
            $state.go('admin');
        };
    }

})();