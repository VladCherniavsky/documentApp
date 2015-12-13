'use strict';
var mongoose    = require('mongoose'),
    config = require('../config'),
    log = require('../libs/log')(module);

mongoose.Promise = require('bluebird');

mongoose.connect(config.get('db:connection'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info('Connected to DB!');
});

module.exports = db;