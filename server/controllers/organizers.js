var express = require('express');
var router = express.Router();
var Organizer = require('../models/organizers');

router.post('/api/organizer', function(req, res, next){
    var organizer = new Organizer(req.body);
    res.send(organizer);
});

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

module.exports = router;