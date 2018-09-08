'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuyProduct = Schema({
    machine: { type: Schema.ObjectId, ref: 'Machine' },
    product: { type: Schema.ObjectId, ref: 'ProductPriceKind' },
    payment_method: String,
    mount: String,
    change: String,
    creditCart: String,
    buy_at: String
});

module.exports = mongoose.model('BuyProduct', BuyProduct);