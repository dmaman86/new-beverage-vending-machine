'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// upload routes
var products_price_kind = require('./routes/product_price_kind');
var machine = require('./routes/machine');
var stock = require('./routes/stock');
var buyproduct = require('./routes/buy_product');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

// routes
app.use('/api', products_price_kind);
app.use('/api', machine);
app.use('/api', stock);
app.use('/api', buyproduct);

// exports 
module.exports = app;