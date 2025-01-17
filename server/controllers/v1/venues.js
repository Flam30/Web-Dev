var express = require('express');
var router = express.Router();
var Venue = require('../../models/venue');

// POST /venues - add new venue
router.post('/', async function(req, res, next) {
    try {
        let duplicateVenue = await Venue.findOne({id: req.body.id});

        if (duplicateVenue !== null) {
            res.status(400).json({'message': 'Id already in use.'});
        } else {
            let venue = new Venue(req.body);
            await venue.save();
            res.status(201).json(venue);
        }
    } catch (error) {
        next(error);
    }
});

// GET /venues - get all venues
router.get('/', async function(req, res, next) {
    try {
        const venues = await Venue.find({});
        if(venues.length < 1) {
            return res.status(404).json({'message': 'No venues registered.'});
        }
        
        res.status(200).send(venues);
    } catch (error) {
        next(error);
    }
});

// GET /venues/:id - get a specific venue
router.get('/:id', async function(req, res, next) {
    try {
        const httpOverride = req.headers['x-http-method-override'];
        var id = req.params.id;
        const venues = await Venue.findOne({id: id});
        if(venues === null) {
            return res.status(404).json({'message': 'No such venue registered.'});
        }

        if (httpOverride && httpOverride.toLocaleLowerCase() === 'delete'){
            await Venue.deleteOne({id: id});
            res.status(200).json("Successfully deleted.");
        } else {
            res.status(200).send(venues);
        }
    } catch (error) {
        next(error);
    }
});

// DELETE /venues - delete all venues
router.delete('/', async function(req, res, next) {
    try {
        const venues = await Venue.find();
        if (venues.length < 1) {
            return res.status(404).json({'message': 'No venues registered.'});
        }
        await Venue.deleteMany();
        res.status(200).json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;