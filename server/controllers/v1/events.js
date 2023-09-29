var express = require('express');
var router = express.Router();
var Event = require('../../models/event');
var mongoose = require('mongoose');

router.post('/', async function(req, res, next) {
    var event = new Event(req.body);
    try {
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        next(err);
    }
});

router.delete('/', async function(req, res, next) {
    try {
        await Event.deleteMany({});
        res.status(200).json();
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
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

router.get('/:id', async function(req, res, next){
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

router.patch('/:id', async function(req, res, next){
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

router.put('/:id', async function(req, res, next){
    var id = req.params.id;
    try {
        const event = await Event.findOneAndReplace({_id: id});
        if (event === null) {
            return res.status(404).json({'message': 'Event not found!'});
        }
        res.json(event);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async function(req, res, next){
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