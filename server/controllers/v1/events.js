var express = require('express');
var router = express.Router();
var Event = require('../../models/event');
var Ticket = require('../../models/ticket');

// POST /events - add new event
router.post('/', async function(req, res, next) {
    try {
        let event = new Event(req.body);
        event._id = event.id;

        await event.save();
        res.status(201).json(event);

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            res.status(400).json({'message': 'Id already in use.'});
        }
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
        
        delete queryParameters.sort;

        let events = await Event.find(queryParameters).sort(sortQuery);

        res.send(events);
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
        
        res.send(events);
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
        res.json(event);
    } catch (err) {
        return next(err);
    }
});

// PATCH /events/:id - update a specific field of an event
router.patch('/:id', async function(req, res, next){
    var id = req.params.id;
    try {
        const event = await Event.findOneAndUpdate({_id: id}, req.body, { new: true });
        if (event === null) {
            return res.status(404).json({'message': 'Event not found!'});
        }
        res.json(event);
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
        res.json("Successfully deleted.");
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
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// GET /events/:eventId/tickets - get specific event's tickets
router.get('/:id/tickets', async function(req, res, next) {
    try {
        var eventId = req.params.id;
        const tickets = await Ticket.find({event: eventId});
        if(tickets.length < 1) {
            return res.status(404).json({'message': 'No tickets exist.'});
        }
        
        res.send(tickets);
    } catch (error) {
        next(error);
    }
});

module.exports = router;