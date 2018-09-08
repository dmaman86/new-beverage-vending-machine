'use strict'

var express = require('express');
var BuyProductController = require('../controllers/buy_product');
var api = express.Router();

api.post('/buy-product/:id', BuyProductController.buyProduct);

module.exports = api;