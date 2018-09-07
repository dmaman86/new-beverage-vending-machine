var ProductPriceKind = require('../models/product_price_kind');

// CRUD products - price - kind

function addProduct(req, res){
    var params = req.body;
    var product = new ProductPriceKind();

    if(params.name && params.price && params.kind){
        product.name = params.name;
        product.price = params.price;
        product.kind = params.kind;

        ProductPriceKind.find({ name: product.name }).exec( (err, prod) => {
            if(err){
                return res.status(500).send({
                    message: `Error to save product ${ err }`
                });   
            }
    
            if( prod && prod.length >= 1 ){
                return res.status(400).send({
                    message: 'Product exist'
                });
            } else {
                product.save( (err, productStored) => {
                    if(err){
                        return res.status(500).send({
                            message: `Error to save product ${ err }`
                        });   
                    }
                    if(!productStored){
                        return res.status(404).send({
                            message: 'Something wrong, try too later or connect to admin'
                        });
                    }

                    return res.status(200).send({
                        product: productStored
                    });
                });
            }
        })

    }else {
        return res.status(200).send({
            message: 'Please fill all data'
        });
    }
}

function updateProduct(req, res){
    var productId = req.params.id;
    var update = req.body;

    ProductPriceKind.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdate) => {
        if(err){
            return res.status(500).send({
                message: `Error in request update ${ err }`
            });
        }
        if(!productUpdate){
            return res.status(404).send({
                message: 'Product not exist'
            });
        }

        return res.status(200).send({ product: productUpdate });
    });
}

function getProduct(req, res){
    var productId = req.params.id;

    ProductPriceKind.findById( productId, (err, product) => {
        if(err){
            return res.status(500).send({
                message: `Error in request get price ${ err }`
            });
        } 
        if(!product){
            return res.status(404).send({
                message: 'Product not exist'
            });
        }

        return res.status(200).send({
            product: product
        });
    });
}

function getProducts(req, res){
    ProductPriceKind.find().exec( (err, products) => {
        if(err){
            return res.status(500).send({
                message: `Error in request get price ${ err }`
            });
        } 
        if(!products){
            return res.status(404).send({
                message: 'No exist products to show'
            });
        }
        return res.status(200).send({
            products: products
        });
    });
}

function deleteProduct(req, res){
    var productId = req.params.id;

    ProductPriceKind.findByIdAndRemove( productId, (err, productDelete) => {
        if(err){
            return res.status(500).send({
                message: `Error in request delete product ${ err }`
            });
        }
        if( !productDelete ){
            return res.status(404).send({
                message: 'Product not exist'
            });
        }

        return res.status(200).send({
            message: 'Product was delete'
        });
    });
}

module.exports = {
    addProduct,
    updateProduct,
    getProduct,
    getProducts,
    deleteProduct
}