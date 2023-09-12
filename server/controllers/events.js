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

module.exports = router;