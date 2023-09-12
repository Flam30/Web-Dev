var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

app.post('/api/customers', async function(req, res, next) {
    var customer = new Customer(req.body);
    try {
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        next(err);
    }
});

router.get('/api/customers', async (req, res, next) => {
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