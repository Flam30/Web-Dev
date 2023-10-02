var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_51NvnEZIeSorUA2wFhH58TE9WBEHysbpdbxcdxZuMIIugCStAChIXEyDKGaha1DCkD3vCbrlL13ypQh7NU3x1KzGl00WCUbbxYd');
var Ticket = require('../../models/ticket');


// POST /events/:eventId/tickets - add tickets to an event
router.post('/', async function(req, res, next) {

    var eventId = req.params.eventId;
    const product = await stripe.products.create({
        name: req.body.type,
        default_price_data: {
            currency: 'SEK',
            unit_amount_decimal: req.body.price * 100
        }
      });
    var ticket = new Ticket(req.body);
    ticket.event = eventId;
    ticket.price = product.default_price;

    try {
        await ticket.save();
        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
});


// GET /events/:eventId/tickets - get specific event's tickets
router.get('/', async (req, res, next) => {
    var eventId = req.params.eventId;

    try {
        const tickets = await Ticket.find({event: eventId});
        if (tickets.length === 0) {
            return res.status(204).json({'message': 'No tickets exist.' });
        }

        res.send(tickets);
    } catch (err) {
        return next(err);
    }
});

// GET /events/:eventId/tickets/:ticketId - get a specific ticket from an event
router.get('/:ticketId', async (req, res, next) => {
    var eventId = req.params.eventId;
    var ticketId = req.params.ticketId;

    try {
        const ticket = await Ticket.find({id: ticketId, event: eventId});
        if (ticket === null) {
            return res.status(404).json({'message': 'Ticket not found!'});
        }

        res.send(ticket);
    } catch (err) {
        return next(err);
    }
});

// DELETE /events/:eventId/tickets - delete all tickets from an event
router.delete('/', async function(req, res, next){
    var eventId = req.params.eventId;

    try {
        const ticket = await Ticket.deleteMany({event: eventId});
        if (ticket === null) {
            return res.status(404).json({'message': 'Tickets do not exist!'});
        }
        res.json(ticket);
    } catch (err) {
        return next(err);
    }
});

// DELETE /events/:eventId/tickets/:ticketId - delete a specific ticket from an event
router.delete('/:ticketId', async function(req, res, next){
    var eventId = req.params.eventId;
    var ticketId = req.params.ticketId;

    try {
        const ticket = await Ticket.findOneAndDelete({id: ticketId, event: eventId});
        if (ticket === null) {
            return res.status(404).json({'message': 'Ticket not found!'});
        }
        res.json(ticket);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;