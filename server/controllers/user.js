'use strict';
var log = require('../libs/log')(module),
    userModel = require('../models/user'),
    bcryptCreatPassword = require('../libs/bcrypt');

exports.addUser = function (req, res, next) {
    if((req.body.username)&&(req.body.password)) {
        var newUser = new userModel({
            username: req.body.username,
            password: bcryptCreatPassword.createHash(req.body.password),
            access: req.body.access
        });
        userModel.findOne({username: req.body.username}).then(function (user) {
            if (user) {
                var err = new Error('User exist');
                err.status = 422;
                return next(err);
            }
            return newUser.save(function (err) {
                if (err) {
                    if (err.name === 'ValidationError') {
                        err.status = 422;
                        err.message = 'Validation error';
                        return next(err);
                    } else {
                        return next(err);
                    }
                } else {
                    log.info('New user created');
                    return res.status(201).send({status: 'OK', user: newUser});
                }
            });
        }).catch(next);
    }else{
        var err = new Error('Validation error(field empty)');
        err.status = 422;
        return next(err);
    }
};

exports.userLogout = function (req, res, next) {
    req.logout();
    log.info('Logout: status OK');
    return res.status(200).send({status: 'OK'});
};

exports.sessionUser = function(req, res, next){
    userModel.findById(req.user.userSessionId).then(function (user) {
        if(user.username){
            res.status(200).send({status: 'AUTH', userSessionId: req.user.userSessionId, userName: user.username, access: user.access});
        }
        else{
            var err = new Error('Not found user');
            err.status = 404;
            return next(err);
        }
    }).catch(next);
};
exports.allUsers = function (req, res, next) {
    userModel.find({})
        .then(function (users) {
            return res.send({status: 'OK', users: users});
        }).catch(next);
};

exports.updateUser = function (req, res, next) {
    userModel.findById(req.params._id).then(function (user) {
        if ((user === null) || (user === undefined)) {
            return res.status(404).send({error: 'Not found'});
        }
        user.access = req.body.access;

        return user.save(function (err) {
            if (err) {
                if (err.name === 'ValidationError') {
                    err.message = 'Validation error';
                    err.status = 422;
                    return next(err);
                } else {
                    return next(err);
                }
            }
            log.info('Link updated');
            return res.status(200).send({status: 'OK', user: user});
        });

    }).catch(next);
};
exports.deleteUser = function (req, res, next) {
    userModel.findById(req.params._id).then(function (user) {
        if ((user === null) || (user === undefined)) {
            var err = new Error('Not found');
            err.status = 404;
            return next(err);
        }
        return user.remove(function (err) {
            if (err) {
                return next(err);
            }
            log.info('Link removed');
            return res.status(200).send({status: 'OK'});
        });
    }).catch(next);
};