'use strict'

var express = require('express');
var ProductsPriceController = require('../controllers/product_price_kind');
var api = express.Router();

api.post('/save-product', ProductsPriceController.addProduct);
api.put('/update-product/:id', ProductsPriceController.updateProduct);
api.get('/get-product/:id', ProductsPriceController.getProduct);
api.get('/get-products', ProductsPriceController.getProducts);
api.delete('/delete-product/:id', ProductsPriceController.deleteProduct);

module.exports = api;