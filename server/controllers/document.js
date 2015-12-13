'use strict';
var log = require('../libs/log')(module),
    documentModel = require('../models/document'),
    shortId = require('shortid');

exports.addDocument = function (req, res, next) {

        var document = new documentModel({
            userId: req.session.passport.user,
            numberDocument: req.body.numberDocument,
            kindDocument: req.body.kindDocument,
            typeDocument: req.body.typeDocument,
            pathDocument: req.body.pathDocument
        });
        document.save(function (err) {
            if (err) {
                return next(err);
            }
            log.info('document created');
            return res.status(201).send({status: 'OK', document: document});
        });
};

exports.allDocuments = function (req, res, next) {
    documentModel.find({})
        .then(function (documents) {
            return res.send({status: 'OK', documents: documents});
        }).catch(next);
};

exports.documentsByIdUser = function (req, res, next) {
    documentModel.find({userId: req.session.passport.user})
        .then(function (documents) {
            return res.send({status: 'OK', documents: documents});
        }).catch(next);
};
//exports.updateDocument = function (req, res, next) {
//    documentModel.findById(req.params._id).then(function (document) {
//        if ((document === null) || (document === undefined)) {
//            return res.status(404).send({error: 'Not found'});
//        }
//        if (document.userId === req.session.passport.user) {
//            document.description = req.body.description;
//            document.hashtags = tags;
//
//            return link.save(function (err) {
//                if (err) {
//                    if (err.name === 'ValidationError') {
//                        err.message = 'Validation error';
//                        err.status = 422;
//                        return next(err);
//                    } else {
//                        return next(err);
//                    }
//                }
//                log.info('Link updated');
//                return res.status(200).send({status: 'OK', link: link});
//            });
//        } else {
//            var err = new Error('Not found');
//            err.status = 404;
//            return next(err);
//        }
//    }).catch(next);
//};

exports.deleteDocument = function (req, res, next) {
    documentModel.findById(req.params._id).then(function (document) {
        if ((document === null) || (document === undefined)) {
            var err = new Error('Not found');
            err.status = 404;
            return next(err);
        }
            return document.remove(function (err) {
                if (err) {
                    return next(err);
                }
                log.info('Link removed');
                return res.status(200).send({status: 'OK'});
            });

    }).catch(next);
};

exports.documentById = function (req, res, next) {
    documentModel.findById(req.params._id).then(function (document) {
        return res.send({status: 'OK', document: document});
    }).catch(next);
};