var express = require('express');
var router = express.Router();
var Ticket = require('../../models/ticket');
const event = require('../../models/event');

// GET /tickets/:id - get a specific ticket
router.get('/:id', async function(req, res, next) {
    try {
        var ticketId = req.params.id;
        const ticket = await Ticket.findOne({_id: ticketId});
        var eventId = ticket.event;
        if(ticket === null) {
            return res.status(404).json({'message': 'No such ticket found.'});
        }
        console.log(ticket);
        const response = {
            id: ticketId,
            price: ticket.price,
            priceId: ticket.priceId,
            quantity: ticket.quantity,
            event: eventId,
            _links: {
                self: { href: `http://localhost:3000/api/v1/events/${eventId}/tickets/${ticketId}` },
                collection: { href: `http://localhost:3000/api/v1/events/${eventId}/tickets` },
                event: { href: `http://localhost:3000/api/v1/events/${eventId}` },
                eventPage: { href: `http://localhost:8080/Event/${eventId}` },

            },
        };
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;