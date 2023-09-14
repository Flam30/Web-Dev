var express = require('express');
var router = express.Router();
var Event = require('../models/event');

router.post('/api/events', async function(req, res, next) {
    var event = new Event(req.body);
    try {
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        next(err);
    }
});

router.get('/api/events', async (req, res, next) => {
    try {
        const events = await Event.find({});
        if (events.length === 0) {
            return res.status(204).json({ 'message': 'No events' });
        }

        res.send(events);
    } catch (err) {
        return next(err);
    }
});

router.get('/api/events/:id', async function(req, res, next){
    var id = req.params.id;
    try {
        const event = await Event.findById(id);
        if (event === null) {
            return res.status(404).json({'message': 'Event not found!'});
        }
        res.json(event);
    } catch (err) {
        return next(err);
    }
});

router.patch('/api/events/:id', async function(req, res, next){
    console.log('here');
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

router.delete('/api/events/:id', async function(req, res, next){
    var id = req.params.id;
    try {
        const event = await Event.findOneAndDelete({_id: id});
        if (event === null) {
            return res.status(404).json({'message': 'Event not found!'});
        }
        res.json(event);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;