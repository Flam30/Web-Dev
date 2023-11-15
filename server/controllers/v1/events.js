var express = require('express');
var router = express.Router();
var Event = require('../../models/event');
var Ticket = require('../../models/ticket');
const stripe = require('stripe')('sk_test_51NvnEZIeSorUA2wFhH58TE9WBEHysbpdbxcdxZuMIIugCStAChIXEyDKGaha1DCkD3vCbrlL13ypQh7NU3x1KzGl00WCUbbxYd');

// POST /events - add new event
router.post('/', async function(req, res, next) {
    try {
        let event = new Event(req.body);

        let duplicateEvent = Event.findOne({id: event.id});

        if (duplicateEvent) {
            res.status(400).json({'message': 'Id already in use.'});
        }

        await event.save();
        res.status(201).json(event);

    } catch (error) {
        next(error);
    }
});

// GET /events - get all events
router.get('/', async function(req, res, next) {
    try {
        if(Event.find({}) === null) {
            return res.status(404).json({'message': 'No events registered.'});
        }

        let sortQuery = [];
        const queryParameters = req.query;

        for (element of [queryParameters["sort"]]) {
            sortQuery = sortQuery + element + " ";
        }
        
        // delete queryParameters.sort;

        let events = await Event.find(queryParameters).sort(sortQuery);

        res.status(200).send(events);
    } catch (error) {
        next(error);
    }
});

// GET /events/:id - get a specific event
router.get('/:id', async function(req, res, next) {
    try {
        var id = req.params.id;
        const events = await Event.findOne({id: id});
        if(events === null) {
            return res.status(404).json({'message': 'No such event registered.'});
        }
        
        res.status(200).send(events);
    } catch (error) {
        next(error);
    }
});

// PUT /events/:id - update a specific event
router.put('/:id', async function(req, res, next){
    var id = req.params.id;
    try {
        const event = await Event.findOneAndReplace({id: id});
        if (event === null) {
            return res.status(404).json({'message': 'Event not found!'});
        }
        res.status(200).json(event);
    } catch (err) {
        return next(err);
    }
});

// PATCH /events/:id - update a specific field of an event
router.patch('/:id', async function(req, res, next){
    var id = req.params.id;
    try {
        const event = await Event.findOneAndUpdate({id: id}, req.body, { new: true });
        if (event === null) {
            return res.status(404).json({'message': 'Event not found!'});
        }
        res.status(200).json(event);
    } catch (err) {
        return next(err);
    }
});

// DELETE /events - delete all events
router.delete('/', async function(req, res, next) {
    try {
        const events = await Event.find();
        if (events.length < 1) {
            return res.status(404).json({'message': 'No events registered.'});
        }
        await Event.deleteMany();
        res.status(200).json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// DELETE /events/:id - delete a specific event
router.delete('/:id', async function(req, res, next) {
    try {
        var id = req.params.id;
        const events = await Event.findOne({id: id});
        if (events === null) {
            return res.status(404).json({'message': 'No such event registered.'});
        }
        await Event.deleteOne({id: id});
        res.status(200).json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// GET /events/:eventId/tickets - get specific event's tickets
router.get('/:eventId/tickets', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        const tickets = await Ticket.find({event: eventId});
        if(tickets.length < 1) {
            return res.status(404).json({'message': 'No tickets exist.'});
        }
        
        res.status(200).send(tickets);
    } catch (error) {
        next(error);
    }
});

// GET /events/:eventId/tickets/:ticketId - get a specific ticket from an event
router.get('/:eventId/tickets/:id', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        var ticketId = req.params.ticketId;
        const tickets = await Ticket.findOne({event: eventId, id: ticketId});
        if(tickets === null) {
            return res.status(404).json({'message': 'No such ticket exists.'});
        }
        
        const response = {
            id: ticketId,
            price: tickets.price,
            priceId: tickets.priceId,
            quantity: tickets.quantity,
            event: eventId,
            _links: {
                self: { href: `http://localhost:3000/api/v1/events/${eventId}/tickets/${ticketId}` },
                collection: { href: `http://localhost:3000/api/v1/events/${eventId}/tickets` },
                event: { href: `http://localhost:3000/api/v1/events/${eventId}` },
            },
        };
        res.status(200).json(response);

    } catch (error) {
        next(error);
    }
});

// POST /events/:eventId/tickets - add new ticket to existing event
router.post('/:eventId/tickets/', async function(req, res, next) {
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
        ticket.priceId = product.default_price;

        let duplicateTicket = Ticket.findOne({event: eventId, id: ticket.id});

        if (duplicateTicket) {
            res.status(400).json({'message': 'Id already in use.'});
        }

        await ticket.save();
        res.status(201).json(ticket);

    } catch (error) {
        if (error.status === 500) {
            res.status(400).json({'message': 'Id already in use.'});
        }
        next(error);
    }
});


// DELETE /events/:eventId/tickets - delete all tickets from an event
router.delete('/:eventId/tickets/', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        const tickets = await Ticket.find({event: eventId});
        if (tickets.length < 1) {
            return res.status(404).json({'message': 'No tickets registered.'});
        }
        await Ticket.deleteMany({event: eventId});
        res.status(200).json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

router.delete('/:eventId/tickets/all', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        const tickets = await Ticket.find({event: eventId});
        if (tickets.length < 1) {
            return res.status(404).json({'message': 'No tickets registered.'});
        }
        await Ticket.deleteMany();
        res.status(200).json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// DELETE /events/:eventId/tickets/:ticketId - delete a specific ticket from an event
router.delete('/:eventId/tickets/:id', async function(req, res, next) {
    try {
        var eventId = req.params.eventId;
        var ticketId = req.params.id;
        const tickets = await Ticket.findOne({id: ticketId, event: eventId});
        if (tickets === null) {
            return res.status(404).json({'message': 'No such ticket exists.'});
        }
        await Ticket.deleteOne({id: ticketId, event: eventId});
        res.status(200).json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;