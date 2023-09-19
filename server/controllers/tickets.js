var express = require('express');
var router = express.Router();
var Event = require('../models/ticket');


// POST /organizers/:id/events/:id/tickets - add tickets to an event
router.post('/api/organizers/:organizerId/events/:eventId/tickets', async function(req, res, next) {

    // fix foreign keys with organizers and events
    // var organizerId = req.params.organizerId;
    // var eventId = req.params.eventId;

    var ticket = new Ticket(req.body);
    try {
        await ticket.save();
        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
});


// GET /organizers/:id/events/:id/tickets - get specific event's tickets
router.get('/api/organizers/:id/events/:id/tickets', async (req, res, next) => {
    
    // fix foreign keys with organizers and events
    // var organizerId = req.params.organizerId;
    // var eventId = req.params.eventId;

    try {
        const tickets = await Ticket.find({});
        if (tickets.length === 0) {
            return res.status(204).json({'message': 'No tickets exist.' });
        }

        res.send(tickets);
    } catch (err) {
        return next(err);
    }
});

// GET /organizers/:id/events/:id/tickets/:id - get a specific ticket from an event
router.get('/api/organizers/:organizerId/events/:eventId/tickets/:ticketId', async (req, res, next) => {
    
    // fix foreign keys with organizers and events
    // var organizerId = req.params.organizerId;
    // var eventId = req.params.eventId;
    var ticketId = req.params.ticketId;

    try {
        const ticket = await Ticket.findById(ticketId);
        if (ticket === null) {
            return res.status(404).json({'message': 'Ticket not found!'});
        }

        res.send(ticket);
    } catch (err) {
        return next(err);
    }
});

// DELETE /organizers/:id/events/:id/tickets/:id - delete a specific ticket from an event
router.delete('/api/organizers/:organizerId/events/:eventId/tickets/:ticketId', async function(req, res, next){
    console.log('here');
    // var organizerId = req.params.organizerId;
    // var eventId = req.params.eventId;
    var ticketId = req.params.ticketId;
    try {
        const ticket = await Ticket.findOneAndDelete({_id: ticketId});
        if (ticket === null) {
            return res.status(404).json({'message': 'Ticket not found!'});
        }
        res.json(ticket);
    } catch (err) {
        return next(err);
    }
});