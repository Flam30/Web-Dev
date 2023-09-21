var express = require('express');
var router = express.Router();
var Venue = require('../../models/venue');   // this was changed?

// POST /venues - add a collection of venues
router.post('/api/v1/venues', async function(req, res, next) {
    var venue = new Venue(req.body);
    try {
        await venue.save();
        res.status(201).json(venue);
    } catch (err) {
        next(err);
    }
});

// GET /venues - get all venues
router.get('/api/v1/venues', async (req, res, next) => {
    try {
        const venues = await Venue.find({});
        if(venues.length === 0) {
            return res.status(204).json({'message': 'No venues exist.'});
        }
        res.send(venues);
    } catch (err) {
        return next(err);
    }
});

// GET /venues/:id - get a venue
router.get('/api/v1/venues/:id', async (req, res, next) => {
    var id = req.params.id;
    try {
        const venues = await Venue.findById(id);
        if (venues.length === 0) {
            return res.status(204).json({'message': 'No venues exist.' });
        }

        res.send(venues);
    } catch (err) {
        return next(err);
    }
});

// DELETE /venues - delete a collection of venues
router.delete('/api/v1/venues', async function(req, res, next){
    console.log('here');
    try {
        const venue = await Venue.deleteMany();
        if (venue === null) {
            return res.status(404).json({'message': 'Venue not found!'});
        }
        res.json(venue);
    } catch (err) {
        return next(err);
    }
});

// DELETE /venues/:id - delete a specific venue
router.delete('/api/v1/venues/:id', async function(req, res, next){
    console.log('here');
    var id = req.params.id;
    try {
        const venue = await Venue.findOneAndDelete({_id: id});
        if (venue === null) {
            return res.status(404).json({'message': 'Venue not found!'});
        }
        res.json(venue);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;