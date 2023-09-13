var express = require('express');
var router = express.Router();
var Venue = require('../models/venue');

router.post('/api/venues', async function(req, res, next) {
    var venue = new Venue(req.body);
    try {
        await venue.save();
        res.status(201).json(venue);
    } catch (err) {
        next(err);
    }
});

router.get('/api/venues', async (req, res, next) => {
    try {
        const venues = await Venue.find({});
        if (venues.length === 0) {
            return res.status(204).json({ 'message': 'No venues exist.' });
        }

        res.send(venues);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/venues/:id', async function(req, res, next){
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