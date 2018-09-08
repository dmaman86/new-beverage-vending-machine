var Stock = require('../models/stock');

// CRUD stock
function saveStock(req, res){
    var machineId = req.params.id;
    console.log( machineId );

    if( req.body.count ){
        var stock = new Stock();
        stock.machine = machineId;
        stock.product = req.body.product;
        stock.count = req.body.count;

        Stock.find({ 'machine': machineId, 'product': req.body.product }).exec( (err, machine) => {
            if(err){
                return res.status(500).send({ message: `Error to find machine ${ err }`});
            }

            if(machine && machine.length >= 1){
                console.log(machine);
                return res.status(400).send({ message: 'You need update stock' });
            }

            else {
                stock.save( (err, stockStored) => {
                    if(err){
                        return res.status(500).send({
                            message: `Error to save this stock ${ err }`
                        });
                    }
                    if( !stockStored ){
                        return res.status(404).send({
                            message: 'Something wrong, connect to admin'
                        });
                    }
        
                    return res.status(200).send({
                        stock: stockStored
                    });
                });
            }
        });
    } else {
        return res.status(200).send({
            message: 'Please fill all data'
        });
    }
}

function getStockMachine(req, res){
    var machineId = req.params.id;

    Stock.find({ 'machine': machineId }).populate('product').exec( (err, products) => {
        if(err){
            return res.status(500).send({
                message: `Error in request get stock in this machine ${ err }`
            });
        }
        if( !products ){
            return res.status(404).send({
                message: 'Error to get products in this machine'
            });
        }

        var products_clean = [];

        products.forEach( (prods) => {
            var item = {
                _id: prods.product._id,
                name: prods.product.name,
                price: prods.product.price,
                kind: prods.product.kind,
                count: prods.count
            };
            products_clean.push( item );
        });

        return res.status(200).send({
            id_machine: machineId,
            count: products_clean.length,
            products: products_clean
        });
    });
}

function updateStockMachine(req, res){
    var machineId = req.params.id;
    var update = req.body;

    Stock.findByIdAndUpdate(machineId, update, { new: true }, (err, stockUpdate) => {
        if(err){
            return res.status(500).send({
                message: `Error to find this machine ${ err }`
            });
        }
        if( !stockUpdate ){
            return res.status(404).send({
                message: 'Machine not found'
            });
        }
        return res.status(200).send({
            stock: stockUpdate
        });
    });
}

module.exports = {
    saveStock,
    getStockMachine,
    updateStockMachine
}