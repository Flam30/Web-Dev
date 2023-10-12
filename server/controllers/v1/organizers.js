var express = require('express');
var router = express.Router();
var Organizer = require('../../models/organizer');

// POST /organizers - add new organizer
router.post('/', async function(req, res, next) {
    try {
        let organizer = new Organizer(req.body);
        organizer._id = organizer.username;

        await organizer.save();
        res.status(201).json(organizer);

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            res.status(400).json({'message': 'Username already in use.'});
        }
        next(error);
    }
});

// GET /organizers - get all organizers
router.get('/', async function(req, res, next) {
    try {
        const organizers = await Organizer.find({});
        if(organizers.length === null) {
            return res.status(404).json({'message': 'No organizers registered.'});
        }
        
        res.send(organizers);
    } catch (error) {
        next(error);
    }
});

// GET /organizers/:id - get a specific organizer
router.get('/:id', async function(req, res, next) {
    try {
        var username = req.params.id;
        const organizers = await Organizer.find({username: username});
        if(organizers.length === null) {
            return res.status(404).json({'message': 'No organizers registered.'});
        }
        
        res.send(organizers);
    } catch (error) {
        next(error);
    }
});

// PUT /organizers/:id - update a specific organizer
router.put('/:id', async function(req, res, next){
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

// PATCH /organizers/:id - update a specific field of an organizer
router.patch('/:id', async function(req, res, next){
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

// DELETE /organizers - delete all organizers
router.delete('/', async function(req, res, next) {
    try {
        const organizers = await Organizer.find();
        if (organizers === null) {
            return res.status(404).json({'message': 'No organizers registered.'});
        }
        await Organizer.deleteMany();
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// DELETE /organizers/:id - delete a specific organizer
router.delete('/:id', async function(req, res, next) {
    try {
        var username = req.params.id;
        const organizers = await Organizer.find({username: username});
        if (organizers === null) {
            return res.status(404).json({'message': 'No such organizer registered.'});
        }
        await Organizer.deleteOne({username: username});
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

/*
    Other functions needed for a organizer:
    - adding an event in organizer.events[]
*/

module.exports = router;