'use strict';
var checkAuth = require('../libs/checkAuth'),
    documentCtrl = require('../controllers/document.js'),
    log = require('../libs/log')(module);
var express = require('express');

var router = express.Router();

router.use(function timeLog(req, res, next) {
    log.info('Time: ', Date.now());
    next();
});

router.get('/documents', documentCtrl.allDocuments);

router.get('/documentId/:_id', documentCtrl.documentById);

router.get('/userDocuments', checkAuth, documentCtrl.documentsByIdUser);

router.post('/', checkAuth, documentCtrl.addDocument);

//router.put('/:_id', checkAuth, documentCtrl.updateLink);

router.delete('/:_id', checkAuth, documentCtrl.deleteDocument);

module.exports = router;