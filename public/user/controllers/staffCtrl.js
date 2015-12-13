'use strict';
(function () {
    angular
        .module('document')
        .controller('staffCtrl',['$log','$state','directorService','$rootScope','growl', staffCtrl]);

    function staffCtrl($log, $state, directorService, $rootScope, growl){
        this.userName = $rootScope.userSession.userName;
        this.userPosition = $rootScope.userSession.access;
        var self = this;

        function allDocuments(){
            directorService.getAllDocuments().then(function(documents){
                self.documents = documents;
            }).catch(function(rej){
                $log.debug('userPageCtrl: getAllUserLinks ERROR');
                $log.debug(rej);
            });
        }
        allDocuments();

        this.deleteDocument = function (documentId) {
            $log.info(documentId);
            directorService.deleteDoc(documentId).then(function () {
                allDocuments();
                growl.success('Short link delete', {title: 'Success!'});
            }).catch(function(rej){
                $log.debug('userPageCtrl: deleteLink ERROR');
                $log.debug(rej);
            });
        };

        this.addNewDocument = function (newDocument, isvalid) {
            if (isvalid) {
                $log.info(newDocument);
                directorService.creatDocument(newDocument).then(function(){
                    allDocuments();
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
    }

})();