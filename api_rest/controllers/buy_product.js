'use strict'

var moment = require('moment');
var BuyProduct = require('../models/buy_product');
var Stock = require('../models/stock');
var ProductPriceKind = require('../models/product_price_kind');

function buyProduct(req, res){
    var idMachine = req.params.id;
    var params = req.body;

}

module.exports = {
    buyProduct
}