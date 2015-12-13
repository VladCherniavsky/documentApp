'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    dbConnect = require('./libs/mongoose'),
    passport = require('./libs/auth'),
    config = require('./config'),
    log = require('./libs/log')(module);

var app = express();
var document = require('./routes/document');
var user = require('./routes/user');

app.use(cookieParser());
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new mongoStore({mongoose_connection: dbConnect}),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname+'../../public')));

app.use('/api/document', document);
app.use('/api/user', user);

// error handlers
app.use(function(err, req, res, next){
    log.error('%s %d %s', req.method, err.status?err.status:req.statusCode, err.message);
    return res.status(err.status?err.status:500).send({error: err.message?err.message:'Error'});
});

app.listen(config.get('port'), function(){
    log.info('sever run ' + config.get('port'));
});
module.exports = app;