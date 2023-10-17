var express = require('express');
var router = express.Router();
var Ticket = require('../../models/ticket');
const stripe = require('stripe')('sk_test_51NvnEZIeSorUA2wFhH58TE9WBEHysbpdbxcdxZuMIIugCStAChIXEyDKGaha1DCkD3vCbrlL13ypQh7NU3x1KzGl00WCUbbxYd');

// POST /events/:eventId/tickets - add new ticket to existing event
router.post('/', async function(req, res, next) {
    try {
        const eventId = req.params.eventId;
        const product = await stripe.products.create({
            name: req.body.id,
            default_price_data: {
                currency: 'SEK',
                unit_amount_decimal: req.body.price * 100
            }
          });
    
        let ticket = new Ticket(req.body);
        ticket.price = product.default_price;
        ticket._id = ticket.id;

        await ticket.save();
        res.status(201).json(ticket);

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            res.status(400).json({'message': 'Id already in use.'});
        }
        next(error);
    }
});

module.exports = router;