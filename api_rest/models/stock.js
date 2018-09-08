'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = Schema({
    machine: { type: Schema.ObjectId, ref: 'Machine' },
    product: { type: Schema.ObjectId, ref: 'ProductPriceKind' },
    count: Number
});

module.exports = mongoose.model( 'Stock', Stock );