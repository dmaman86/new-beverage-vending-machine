var Machine = require('../models/machine');

// CRUD machines
function addMachine(req, res){
    var params = req.body;

    if(!params.address){
        return res.status(200).send({
            message: 'Please, enter a address of machine'
        });
    }

    var machine = new Machine();
    machine.address = params.address;

    console.log(machine);

    Machine.find({ address: machine.address}).exec( (err, machineFound) => {
        if(err){
            return res.status(500).send({
                message: `Error to save machine ${ err }`
            });
        }
        if(machineFound && machineFound.length > 0){
            return res.status(200).send({
                message: 'This machine exist'
            });
        }
        else {
            machine.save( (err, machineStored) => {
                if(err){
                    return res.status(500).send({
                        message: `Error to save machine ${ err }`
                    });
                }
                if(!machineStored){
                    return res.status(404).send({
                        message: 'Something wrong, connect to admin'
                    });
                }

                return res.status(200).send({
                    machine: machineStored
                })
            });
        }
    });

    /*Machine.find({ address: machine.address }, (err, machineFound) => {
        if(err){
            return res.status(500).send({
                message: `Error to save machine ${ err }`
            });
        }
        if(machineFound){
            return res.status(200).send({
                message: 'This machine exist'
            });
        }
        else {
            machine.save( (err, machineStored) => {
                if(err){
                    return res.status(500).send({
                        message: `Error to save machine ${ err }`
                    });
                }
                if(!machineStored){
                    return res.status(404).send({
                        message: 'Something wrong, connect to admin'
                    });
                }

                return res.status(200).send({
                    machine: machineStored
                })
            });
        }
    });*/
}

function updateMachine(req, res){
    var machineId = req.params.id;
    var update = req.body;

    if(!update.address){
        return res.status(200).send({
            message: 'Please enter a address'
        });
    }

    Machine.findByIdAndUpdate(machineId, update, {new: true}, (err, machineUpdate) => {
        if(err){
            return res.status(500).send({
                message: `Error to find machine ${ err }`
            });
        }
        if(!machineUpdate){
            return res.status(404).send({
                message: 'Machine not found to update'
            });
        }

        return res.status(200).send({
            machine: machineUpdate
        });
    });
}

function getMachine(req, res){
    var machineId = req.params.id;

    Machine.findById( machineId ).exec( (err, machineFound) => {
        if(err){
            return res.status(500).send({
                message: `Error to found machine ${ err }`
            });
        }
        if(!machineFound){
            return res.status(404).send({
                message: 'Machine not found'
            });
        }

        return res.status(200).send({
            machine: machineFound
        });
    });
}

function getMachines(req, res){
    Machine.find().exec( (err, machines) => {
        if(err){
            return res.status(500).send({
                message: `Error to found machines`
            });
        }
        if(!machines){
            return res.status(404).send({
                message: 'No exist machines to show'
            });
        }
        return res.status(200).send({
            machines: machines
        })
    });
}

function deleteMachine(req, res){
    var machineId = req.params.id;

    Machine.findByIdAndRemove( machineId, (err, machine) => {
        if(err){
            return res.status(500).send({
                message: `Error to found machines`
            });
        }
        if(!machine){
            return res.status(404).send({
                message: 'No exist machine'
            });
        }
        return res.status(200).send({
            message: 'Machine was delete'
        });
    });
}

module.exports = {
    addMachine,
    updateMachine,
    getMachine,
    getMachines,
    deleteMachine
}