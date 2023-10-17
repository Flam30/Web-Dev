var express = require('express');
var router = express.Router();
var Organizer = require('../../models/organizer');
var Event = require('../../models/event');
var passport = require('passport');
var jwt = require('jsonwebtoken');

// POST /organizers/register - register a new organizer
router.post("/register", function (req, res) {
    var organizer = new Organizer(req.body);
    organizer._id = organizer.username;
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
                    res.status(201).json({ success: true, message: "Your account has been registered!" });
                }
            });
        }
    });
});

// POST /organizers/login - login as an organizer
router.post("/login", function (req, res, next) {
    if (!req.body.username) {
        res.status(400).json({ success: false, message: "Missing username" })
    }
    else if (!req.body.password) {
        res.status(400).json({ success: false, message: "Missing password" })
    }
    else {
        passport.authenticate("organizerStrategy", function (err, organizer, info) {
            if (err) {
                res.status(500).json({ success: false, message: err });
            }
            else {
                if (!organizer) {
                    res.status(401).json({ success: false, message: "Username or password incorrect" });
                }
                else {
                    // Change secretkey to an actual secret key (env variable)
                    const token = jwt.sign({ organizerId: organizer._id, username: organizer.username }, "secretkey", { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful", organizerId: organizer._id, token: token});
                }
            }
        })(req, res, next);
    }
});

// POST /organizers/:organizerId/events/:eventId - add an event to the organizer
router.post('/:organizerId/events/', async function (req, res, next) {
    try {
        let organizerUsername = req.params.organizerId;

        await Organizer.find({username: organizerUsername}, function (err, organizer) {
            if (organizer) {
                let event = new Event(req.body);
                let eventExists = organizer.events.some(existingEvent => existingEvent.equals(event));

                if(!eventExists) {
                    organizer.tickets.push(event);
                    organizer.save(function (err, event) {
                        res.status(201).json(event);
                    });
                } else {
                    res.status(204).json({ message: 'Event already exists.'});
                }
            } else {
                res.status(404).json({ message: 'Organizer does not exist.'});
            }
        });
    } catch (error) {
        next(error);
    }
});

// GET /organizers - get all organizers
router.get('/', async function(req, res, next) {
    try {
        const organizers = await Organizer.find({});
        if(organizers.length < 1) {
            return res.status(404).json({'message': 'No organizers registered.'});
        }
        
        res.status(200).send(organizers);
    } catch (error) {
        next(error);
    }
});

// GET /organizers/:id - get a specific organizer
router.get('/:id', async function(req, res, next) {
    try {
        var username = req.params.id;
        const organizers = await Organizer.findOne({username: username});
        if(organizers === null) {
            return res.status(404).json({'message': 'No such organizer registered.'});
        }
        
        res.status(200).send(organizers);
    } catch (error) {
        next(error);
    }
});

// PUT /organizers/:id - update a specific organizer
router.put('/:id', async function(req, res, next){
    try {
        const organizer = await Organizer.findOneAndReplace({username: req.params.id}, req.body, {new: true});
        if (organizer === null) {
            return res.status(404).json({'message': 'Organizer not found!'});
        }
        res.status(200).json(organizer);
    } catch (err) {
        return next(err);
    }
});

// PATCH /organizers/:id - update a specific field of an organizer
router.patch('/:id', async function(req, res, next){
    try {
        const organizer = await Organizer.findOneAndUpdate({username: req.params.id}, req.body, {new: true});
        if (organizer === null) {
            return res.status(404).json({'message': 'Organizer not found!'});
        }
        organizer.save();
        res.status(200).json(organizer);
    } catch (err) {
        return next(err);
    }
});

// DELETE /organizers - delete all organizers
router.delete('/', async function(req, res, next) {
    try {
        const organizers = await Organizer.find();
        if (organizers.length < 1) {
            return res.status(404).json({'message': 'No organizers registered.'});
        }
        await Organizer.deleteMany();
        res.status(200).json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// DELETE /organizers/:id - delete a specific organizer
router.delete('/:id', async function(req, res, next) {
    try {
        var username = req.params.id;
        const organizers = await Organizer.findOne({username: username});
        if (organizers === null) {
            return res.status(404).json({'message': 'No such organizer registered.'});
        }
        await Organizer.deleteOne({username: username});
        res.status(200).json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;