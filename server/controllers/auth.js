var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


// These endpoints should be moved to /api/users, they're here just for testing!

router.post("/api/register", function (req, res) {
    var user = new User({
        username: req.body.username, 
        name: req.body.name, 
        email: req.body.email, 
        address: req.body.address, 
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth});
    User.register(user, req.body.password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be registered. Error: " + err });
        }
        else {
            req.login(user, (er) => {
                if (er) {
                    res.json({ success: false, message: er });
                }
                else {
                    res.json({ success: true, message: "Your account has been registered!" });
                }
            });
        }
    });
});

router.post("/api/login", function (req, res) {
    if (!req.body.username) {
        res.json({ success: false, message: "Missing username" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Missing password" })
    }
    else {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!user) {
                    res.json({ success: false, message: "Username or password incorrect" });
                }
                else {
                    const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful", token: token });
                }
            }
        })(req, res);
    }
});

module.exports = router;