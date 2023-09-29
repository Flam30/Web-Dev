var express = require('express');
var router = express.Router();
var Customer = require('../../models/customer');

router.post('/api/customers', async function(req, res, next) {
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

router.delete('/api/customers', async function(req, res, next) {
    var customer = new Customer(req.body);
    try {
        await Customer.deleteMany(customer);
        res.status(201).json(customer);
    } catch (err) {
        next(err);
    }
});

//what should be the identifier for customers? can it be the parent (user) name?
// router.delete('/api/customers/:id', async function(req, res, next){
//     try {
//         const customer = await Customer.findOneAndDelete({name: req.params.id}, req.body, {new: true});
//         if (organizer === null) {
//             return res.status(404).json({'message': 'Organizer not found!'});
//         }
//         res.json(organizer);
//     } catch (err) {
//         return next(err);
//     }
// });

module.exports = router;