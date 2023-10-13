var express = require('express');
var router = express.Router();
var Venue = require('../../models/venue');

// POST /venues - add new venue
router.post('/', async function(req, res, next) {
    try {
        let venue = new Venue(req.body);
        venue._id = venue.id;

        await venue.save();
        res.status(201).json(venue);

    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            res.status(400).json({'message': 'Id already in use.'});
        }
        next(error);
    }
});

// GET /venues - get all venues
router.get('/', async function(req, res, next) {
    try {
        const venues = await Venue.find({});
        if(venues.length === null) {
            return res.status(404).json({'message': 'No venues registered.'});
        }
        
        res.send(venues);
    } catch (error) {
        next(error);
    }
});

// GET /venues/:id - get a specific venue
router.get('/:id', async function(req, res, next) {
    try {
        var id = req.params.id;
        const venues = await Venue.find({id: id});
        if(venues.length === null) {
            return res.status(404).json({'message': 'No venues registered.'});
        }
        
        res.send(venues);
    } catch (error) {
        next(error);
    }
});

// DELETE /venues - delete all venues
router.delete('/', async function(req, res, next) {
    try {
        const venues = await Venue.find();
        if (venues === null) {
            return res.status(404).json({'message': 'No venues registered.'});
        }
        await Venue.deleteMany();
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// DELETE /venues/:id - delete a specific venue
router.delete('/:id', async function(req, res, next) {
    try {
        var id = req.params.id;
        const venues = await Venue.find({id: id});
        if (venues === null) {
            return res.status(404).json({'message': 'No such venue registered.'});
        }
        await Venue.deleteOne({id: id});
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;