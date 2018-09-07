'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsPriceKind = Schema({
    name: String,
    price: Number,
    kind: String
});

module.exports = mongoose.model('ProductPriceKind', ProductsPriceKind);