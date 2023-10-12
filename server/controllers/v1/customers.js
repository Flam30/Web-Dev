var express = require('express');
var router = express.Router();
var Customer = require('../../models/customer');

// POST /customers - add new customer
router.post('/', async function(req, res, next) {
    try {
        let customer = new Customer(req.body);
        customer._id = customer.username;

        await customer.save();
        res.status(201).json(customer);

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            res.status(400).json({'message': 'Username already in use.'});
        }
        next(error);
    }
});

// GET /customers - get all customers
router.get('/', async function(req, res, next) {
    try {
        const customers = await Customer.find({});
        if(customers.length === null) {
            return res.status(404).json({'message': 'No customers registered.'});
        }
        
        res.send(customers);
    } catch (error) {
        next(error);
    }
});

// GET /customers/:id - get a specific customer
router.get('/:id', async function(req, res, next) {
    try {
        var username = req.params.id;
        const customers = await Customer.find({username: username});
        if(customers.length === null) {
            return res.status(404).json({'message': 'No customers registered.'});
        }
        
        res.send(customers);
    } catch (error) {
        next(error);
    }
});

// PUT /customers/:id - update a specific customer
router.put('/:id', async function(req, res, next){
    try {
        const customer = await Customer.findOneAndReplace({username: req.params.id}, req.body, {new: true});
        if (customer === null) {
            return res.status(404).json({'message': 'Customer not found!'});
        }
        res.json(customer);
    } catch (err) {
        return next(err);
    }
});

// PATCH /customers/:id - update a specific field of a specific customer
router.patch('/:id', async function(req, res, next){
    try {
        const customer = await Customer.findOneAndUpdate({username: req.params.id}, req.body, {new: true});
        if (customer === null) {
            return res.status(404).json({'message': 'Customer not found!'});
        }
        res.json(customer);
    } catch (err) {
        return next(err);
    }
});

// DELETE /customers - delete all customers
router.delete('/', async function(req, res, next) {
    try {
        const customers = await Customer.find();
        if (customers === null) {
            return res.status(404).json({'message': 'No customers registered.'});
        }
        await Customer.deleteMany();
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// DELETE /customer/:id - delete a specific customer
router.delete('/:id', async function(req, res, next) {
    try {
        var username = req.params.id;
        const customers = await Customer.find({username: username});
        if (customers === null) {
            return res.status(404).json({'message': 'No such customer registered.'});
        }
        await Customer.deleteOne({username: username});
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

/*
    Other functions needed for a customer:
    - adding a ticket in customer.tickets[]
*/

module.exports = router;