'use strict'

var express = require('express');
var StockController = require('../controllers/stock');
var api = express.Router();

api.post('/save-stock/:id', StockController.saveStock);
api.get('/get-stock-machine/:id', StockController.getStockMachine);
api.put('/update-stock-machine/:id', StockController.updateStockMachine);

module.exports = api;