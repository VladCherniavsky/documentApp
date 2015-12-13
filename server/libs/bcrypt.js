'use strict';
var bcrypt = require('bcryptjs');

exports.createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
exports.isValidPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);
};