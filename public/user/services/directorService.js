'use strict';
(function () {
    angular
        .module('document')
        .service('directorService',['$http','$log', directorService]);

    function directorService ($http, $log) {
        this.getAllDocuments = function() {
            return $http({
                method: 'GET',
                url: '/api/document/documents'
            }).then(function(res){
                $log.info(res);
                return res.data.documents;
            }).catch(function(reject) {
                throw reject;
            });
        };

        this.deleteDoc = function(documentId) {
            return $http({
                method: 'DELETE',
                url: '/api/document/'+documentId
            }).then(function(res){
                $log.info(documentId);
                return res;
            }).catch(function(reject) {
                throw reject;
            });
        };
        this.creatDocument = function (document) {
            return $http({
                method: 'POST',
                url: '/api/document',
                data: document
            }).then(function(res){
                return res;
            }).catch(function(reject) {
                throw reject;
            });
        };
    }

})();