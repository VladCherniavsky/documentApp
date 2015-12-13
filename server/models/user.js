'use strict';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var user = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    access:{
        type: String,
        required: true
    }
});

// validation
user.path('username').validate(function (v) {
    return v.length > 2 && v.length < 30;
});

var userModel = mongoose.model('User', user);

module.exports = userModel;