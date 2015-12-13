'use strict';
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var document = new Schema({
    userId: String,
    numberDocument:{
        type: String,
        required: true
    },
    kindDocument:{
        type: String,
        required: true
    },
    typeDocument:{
        type: String,
        required: true
    },
    pathDocument:{
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

var documentModel = mongoose.model('Document', document);

module.exports = documentModel;