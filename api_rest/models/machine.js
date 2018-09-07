'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Machine = Schema({
    address: String
});

module.exports = mongoose.model('Machine', Machine);