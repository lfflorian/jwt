'use strict';
const mongoose = require('mongoose');

const user = mongoose.Schema({
    email: {type: String, require: true },
    password: {type: String, require: true }
});

module.exports = mongoose.model('User', user);
