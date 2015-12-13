'use strict';
var log = require('../libs/log')(module);
module.exports = function(req, res, next) {
    if (!req.session || !req.session.passport || !req.session.passport.user) {
        log.info('User NOT have session: login');
        log.info(req.session.passport.user);
        return res.status(401).send({status: 'NO AUTH'});
    }
    log.info('User have session: login');
    log.info(req.session.passport.user);
    next();
};