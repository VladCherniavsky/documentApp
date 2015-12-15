'use strict';
(function () {
    angular
        .module('document')
        .controller('adminCtrl',['adminService','$state','$log','growl','$rootScope', adminCtrl]);

    function adminCtrl (adminService, $state, $log, growl, $rootScope) {
        var self = this;




        this.addNewUser = function (newUser, isvalid) {
            if (isvalid) {
                $log.info(newUser);
                adminService.postRegistrationUser(newUser).then(function(){
                    allUsers();
                    growl.success('Registration success', {title: 'Seccess!'});
                }).catch(function(rej){
                    $log.debug('userRegistrationCtrl: postRegistrationUser ERROR', {title: 'ALERT WE GOT ERROR'});
                    $log.debug(rej);
                    if((rej.statusText === 'Unprocessable Entity')&&(rej.data.error === 'User exist')){
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

        this.userName = $rootScope.userSession.userName;
        this.userPosition = $rootScope.userSession.access;


        this.Vis={
            admin:false,
            manager:false,
            staff:false,
            dir:false
        };

        this.visibilityDoc=[];
        this.addRemoveVis=function(val,bool){
           
             console.log(val);
             console.log(bool);
            if(bool){
                var index=this.visibilityDoc.indexOf(val);
                if(index > -1){

                }
                else{
                    this.visibilityDoc.push(val);
                    console.log( this.visibilityDoc);
                }
            }
            else{
                 var index=this.visibilityDoc.indexOf(val);
                 console.log(index)
                 if(index > -1){
                    this.visibilityDoc.splice(index);
                    console.log( this.visibilityDoc);
                 }
            }

        }
        

        function allUsers(){
            adminService.getAllUsers().then(function(users){
                self.users = users;
            }).catch(function(rej){
                $log.debug('userPageCtrl: getAllUserLinks ERROR');
                $log.debug(rej);
            });
        }

        allUsers();

        this.goToEditUser = function (user) {
            $state.go('editUser',{ user: user });
        };
        
        
        this.deleteUser = function (userId) {
            adminService.deleteUser(userId).then(function () {
                allUsers();
                growl.success('Short link delete', {title: 'Success!'});
            }).catch(function(rej){
                $log.debug('userPageCtrl: deleteLink ERROR');
                $log.debug(rej);
            });
        }
    }

})();