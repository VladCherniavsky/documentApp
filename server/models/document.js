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
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    visibility :{
        type: [],
        required: false
    }
});

var documentModel = mongoose.model('Document', document);

module.exports = documentModel;