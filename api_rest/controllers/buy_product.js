'use strict'

var moment = require('moment');
var BuyProduct = require('../models/buy_product');
var Stock = require('../models/stock');
var ProductPriceKind = require('../models/product_price_kind');
var Machine = require('../models/machine');

function buyProduct(req, res){
    var idMachine = req.params.id;
    var params = req.body;

    var buy_product = new BuyProduct();
    buy_product.payment_method = params.payment_method;

    searchMachine( idMachine ).then( (value) => {
        if( value.machine ){
            var machine = value.machine;
            buy_product.machine = machine;

            searchProduct( params.product ).then( (value ) => {
                if( value.product ) {
                    var produc = value.product;
                    buy_product.product = produc;
                    buy_product.buy_at = moment().unix();
        
                    if( params.payment_method == 'money'){
                        buy_product.mount = params.mount;
                        
                        if( params.mount < produc.price ){
                            return res.status(500).send({
                                message: 'You cant pay, send more money'
                            });
                        } else {
                            buy_product.change = params.mount - produc.price;
                        }
                        buy_product.creditCart = undefined;
                    } 
                    // if payment method is credit cart
                    else{
                        buy_product.mount = produc.price;
                        buy_product.change = '0';
                        buy_product.creditCart = '8685341594831651';
                    }

                    // we need to check count of this product
                    console.log( 'line 47 ' + buy_product.product._id );
                    getCountProduct( buy_product.product._id  ).then( (value) => {
                        console.log( value.product[0].count );
                        if( value.product[0].count > 0 ){
                            // we save a transaccion
                            buy_product.save( (err, payment) => {
                                if(err){
                                    return res.status(500).send({
                                        message: `Something wrong to save this payment`
                                    });
                                }

                                // we need to update stock product in this machine
                                // but we need to get a atributes from a product
                                updateStockAfterPay( payment.machine._id, payment.product._id ).then( (value) => {
                                    if( value.stock ){
                                        var idStock = value.stock[0]._id ;
                                        var count = value.stock[0].count - 1;

                                        // we need id stock and a new count and update this
                                        updateStock( idStock, count ).then( (value) => {
                                            if( value.stock ){

                                            // if all is ok we return data transaccion
                                            return res.status(200).send({
                                                product: payment
                                            });
                                        }
                                    })
                                }
                            });
                        });
                        } else {
                            return res.status(200).send({
                                message: 'Sorry but this product is empty'
                            })
                        }
                    });
                }
            });
        }
    });
}

async function searchMachine( machineId ){
    var mach = await Machine.findById( machineId, (err, machine) => {
        if(err) return handleError(err);
        return machine;
    });
    return {
        machine: mach
    }
}

async function searchProduct( productId ){
    var prod = await ProductPriceKind.findById( productId, (err, product) => {
        if(err) return handleError(err);
        return product;
    });

    return {
        product: prod
    }
}

async function updateStockAfterPay( machineId, productId ){
    var up = await Stock.find({ machine: machineId, product: productId }, (err, stock) => {
        if( err ) return handleError(err);
        return stock;
    });

    return {
        stock: up
    }
}

async function updateStock( idStock, update ){
    var item = {
        count: update
    }
    var rret = await Stock.findByIdAndUpdate( idStock, item, {new: true}, (err, stcup) => {
        if(err) return handleError(err);
        return stcup;
    });

    return {
        stock: rret
    }
}

async function getCountProduct( idProduct ){
    var stc = await Stock.find({ product: idProduct }, (err, found) => {
        if(err) return handleError(err);
        return found;
    });
    return {
        product: stc
    }
}

module.exports = {
    buyProduct
}