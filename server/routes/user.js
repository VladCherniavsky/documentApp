'use strict';
var userCtrl = require('../controllers/user.js'),
    passport = require('../libs/auth'),
    checkAuth = require('../libs/checkAuth'),
    log = require('../libs/log')(module);
var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    log.info('Time: ', Date.now());
    next();
});

router.get('/users', userCtrl.allUsers);
router.get('/me', checkAuth, userCtrl.sessionUser);
router.get('/logout', checkAuth, userCtrl.userLogout);

router.put('/:_id', checkAuth, userCtrl.updateUser);
router.delete('/:_id', checkAuth, userCtrl.deleteUser);

router.post('/registration', checkAuth, userCtrl.addUser);
router.post('/login', passport.authenticate('local', {}), function (req, res) {
    res.status(200).send({
        status: 'AUTH', userSessionId: req.user.userSessionId, userName: req.user.userNameSession, access: req.user.accessSession
    });
});

module.exports = router;