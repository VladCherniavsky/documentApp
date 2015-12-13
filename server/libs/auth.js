'use strict';
var passport = require('passport'),
    userModel = require('../models/user'),
    log = require('../libs/log')(module),
    LocalStrategy = require ('passport-local').Strategy,
    bcryptCheckPassword = require('../libs/bcrypt');

passport.use(new LocalStrategy(
    function(username, password, done){
        userModel.findOne({ username: username.toLowerCase() }, function(err, user){
            if(err){
                log.info('Login error');
                return done(null, false);
            }
            if(!user) {
                log.info('Login fail, not user');
                return done(null, false);
            }
            if (bcryptCheckPassword.isValidPassword(user,password)){
                log.info('Login succes, session id - take!');
                return done(null, {userSessionId: user._id, userNameSession: user.username, accessSession: user.access});
            }
            log.info('Login fail, password not valid');
            return done(null, false);
        });
    }
));
passport.serializeUser(function(user, done){
    done(null, user.userSessionId, user.userNameSession);
});

passport.deserializeUser(function(userId, done){
    done(null, {userSessionId: userId});
});

module.exports = passport;