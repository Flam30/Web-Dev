var express = require('express');
var router = express.Router();
var Organizer = require('../models/organizer');

router.get('/api/organizers', async (req, res, next) => {
    try {
        const organizers = await Organizer.find({});
        if (organizers.length === 0) {
            return res.status(204).json({ 'message': 'No organizers' });
        }

        res.send(organizers);
    } catch (err) {
        return next(err);
    }
});

router.get('/api/organizers/:id', async function(req, res, next){
    try {
        const organizer = await Organizer.findOne({name: req.params.id});
        if (organizer === null) {
            return res.status(404).json({'message': 'Organizer not found!'});
        }
        res.json(organizer);
    } catch (err) {
        return next(err);
    }
});

router.post('/api/organizers', async function(req, res, next){
    var organizer = new Organizer(req.body);
    try {
        await organizer.save();
        res.status(201).json(organizer);
    } catch (err) {
        next(err);
    }
});

//{... req.body, { new: true } do we need these two here? or up there ^^^ ?
router.put('/api/organizers/:id', async function(req, res, next){
    try {
        const organizer = await Organizer.findOneAndReplace({name: req.params.id}, req.body, {new: true});
        if (organizer === null) {
            return res.status(404).json({'message': 'Organizer not found!'});
        }
        res.json(organizer);
    } catch (err) {
        return next(err);
    }
});

router.patch('/api/organizers/:id', async function(req, res, next){
    console.log('here');
    try {
        const organizer = await Organizer.findOneAndUpdate({name: req.params.id}, req.body, {new: true});
        if (organizer === null) {
            return res.status(404).json({'message': 'Organizer not found!'});
        }
        organizer.save();
        res.json(organizer);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/organizers', async function(req, res, next) {
    var organizer = new Organizer(req.body);
    try {
        await Organizer.deleteMany(organizer);
        res.status(201).json(organizer);
    } catch (err) {
        next(err);
    }
});

router.delete('/api/organizers/:id', async function(req, res, next){
    try {
        const organizer = await Organizer.findOneAndDelete({name: req.params.id}, req.body, {new: true});
        if (organizer === null) {
            return res.status(404).json({'message': 'Organizer not found!'});
        }
        res.json(organizer);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;