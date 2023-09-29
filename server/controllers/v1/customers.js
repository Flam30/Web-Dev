var express = require('express');
var router = express.Router();
var Customer = require('../../models/customer');

router.get('/', async (req, res, next) => {
    try {
        const customers = await Customer.find({});
        if (customers.length === 0) {
            return res.status(204).json({ 'message': 'No customers' });
        }

        res.send(customers);
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async function(req, res, next){
    try {
        const customer = await Customer.findOne({username: req.params.id});
        if (customer === null) {
            return res.status(404).json({'message': 'Customer not found!'});
        }
        res.json(customer);
    } catch (err) {
        return next(err);
    }
});

router.post('/', async function (req, res, next) {
    var customer = new Customer(req.body);
    try {
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        next(err);
    }
});

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

router.patch('/:id', async function(req, res, next){
    console.log('here');
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

router.delete('/', async function(req, res, next) {
    try {
        await Customer.deleteMany({});
        res.status(200).json();
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async function(req, res, next){
    try {
        const customer = await Customer.findOneAndDelete({username: req.params.id}, req.body, {new: true});
        if (customer === null) {
            return res.status(404).json({'message': 'Customer not found!'});
        }
        res.json(customer);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;