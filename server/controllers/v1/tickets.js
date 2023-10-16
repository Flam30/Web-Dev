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

// GET /events/:eventId/tickets - get specific event's tickets
router.get('/', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        const tickets = await Ticket.find({event: eventId});
        if(tickets.length < 1) {
            return res.status(404).json({'message': 'No tickets exist.'});
        }
        
        res.send(tickets);
    } catch (error) {
        next(error);
    }
});

// GET /events/:eventId/tickets/:ticketId - get a specific ticket from an event
router.get('/:id', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        var ticketId = req.params.ticketId;
        const tickets = await Ticket.findOne({event: eventId, id: ticketId});
        if(tickets === null) {
            return res.status(404).json({'message': 'No such ticket exists.'});
        }
        
        res.send(tickets);
    } catch (error) {
        next(error);
    }
});

// DELETE /events/:eventId/tickets - delete all tickets from an event
router.delete('/', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        const tickets = await Ticket.find({event: eventId});
        if (tickets.length < 1) {
            return res.status(404).json({'message': 'No tickets registered.'});
        }
        await Ticket.deleteMany({event: eventId});
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

router.delete('/all', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        const tickets = await Ticket.find({event: eventId});
        if (tickets.length < 1) {
            return res.status(404).json({'message': 'No tickets registered.'});
        }
        await Ticket.deleteMany();
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// DELETE /events/:eventId/tickets/:ticketId - delete a specific ticket from an event
router.delete('/:id', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        var ticketId = req.params.id;
        const tickets = await Ticket.findOne({id: ticketId, event: eventId});
        if (tickets === null) {
            return res.status(404).json({'message': 'No such ticket exists.'});
        }
        await Ticket.deleteOne({id: ticketId, event: eventId});
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;