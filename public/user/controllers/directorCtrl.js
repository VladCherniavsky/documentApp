'use strict';
(function () {
    angular
        .module('document')
        .controller('directorCtrl',['$log','$state','directorService','$rootScope','growl','Upload', directorCtrl]);
      

       
        

    function directorCtrl($log, $state, directorService, $rootScope,$scope, growl){
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
  

        this.documentKinds= ['item 1', 'item 2', 'item 3'];
        this.uploadFile = function(){
            var file = this.myFile;
            console.log('file is ' );
            console.dir(file);
            /*var uploadUrl = "/fileUpload";
            fileUpload.uploadFileToUrl(file, uploadUrl);*/
        };


        




        /*this.upload = function (file) {
            console.log(file);
            this.fileToUpload=file;
             console.log(this.fileToUpload);
      
    };*/
   



       

        var self = this;

        function allDocuments(){
            directorService.getAllDocuments().then(function(documents){
                self.documents = documents;
                console.log(self.documents);
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
              newDocument.visibilityArray=this.visibilityDoc;
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