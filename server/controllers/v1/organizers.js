var express = require('express');
var router = express.Router();
var Organizer = require('../../models/organizer');
var passport = require('passport');
var jwt = require('jsonwebtoken');

// POST /organizers - add new organizer
router.post("/register", function (req, res) {
    var organizer = new Organizer(req.body);
    Organizer.register(organizer, req.body.password, function (err, organizer) {
        if (err) {
            res.status(400).json({ success: false, message: "Your account could not be registered. Error: " + err });
        }
        else {
            req.login(organizer, (er) => {
                if (er) {
                    res.status(500).json({ success: false, message: er });
                }
                else {
                    res.status(200).json({ success: true, message: "Your account has been registered!" });
                }
            });
        }
    });
});

router.post("/login", function (req, res, next) {
    if (!req.body.email) {
        res.status(400).json({ success: false, message: "Missing email" })
    }
    else if (!req.body.password) {
        res.status(400).json({ success: false, message: "Missing password" })
    }
    else {
        passport.authenticate("local", function (err, organizer, info) {
            if (err) {
                res.status(500).json({ success: false, message: err });
            }
            else {
                if (!organizer) {
                    res.status(401).json({ success: false, message: "Email or password incorrect" });
                }
                else {
                    // Change secretkey to an actual secret key (env variable)
                    const token = jwt.sign({ organizerId: organizer._id, email: organizer.email }, "secretkey", { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful", organizerId: organizer._id, token: token});
                }
            }
        })(req, res, next);
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