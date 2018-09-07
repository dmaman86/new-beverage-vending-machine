'use strict'

var express = require('express');
var MachineController = require('../controllers/machine');
var api = express.Router();

api.post('/save-machine', MachineController.addMachine);
api.put('/update-machine/:id', MachineController.updateMachine);
api.get('/get-machine/:id', MachineController.getMachine);
api.get('/get-machines', MachineController.getMachines);
api.delete('/delete-machine/:id', MachineController.deleteMachine);

module.exports = api;