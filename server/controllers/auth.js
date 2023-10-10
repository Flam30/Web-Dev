var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var passport = require('passport');
var jwt = require('jsonwebtoken');


// These endpoints should be moved to customers, they're here just for testing!

router.post("/register", function (req, res) {
    var customer = new Customer({
        username: req.body.username, 
        name: req.body.name, 
        email: req.body.email, 
        address: req.body.address, 
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth});
    Customer.register(customer, req.body.password, function (err, customer) {
        if (err) {
            res.status(400).json({ success: false, message: "Your account could not be registered. Error: " + err });
        }
        else {
            req.login(customer, (er) => {
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
    if (!req.body.username) {
        res.status(400).json({ success: false, message: "Missing username" })
    }
    else if (!req.body.password) {
        res.status(400).json({ success: false, message: "Missing password" })
    }
    else {
        passport.authenticate("local", function (err, customer, info) {
            if (err) {
                res.status(500).json({ success: false, message: err });
            }
            else {
                if (!customer) {
                    res.status(401).json({ success: false, message: "Username or password incorrect" });
                }
                else {
                    // Change secretkey to an actual secret key (env variable)
                    const token = jwt.sign({ customerId: customer._id, username: customer.username }, "secretkey", { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful", customerId: customer._id, token: token});
                }
            }
        })(req, res, next);
    }
});

module.exports = router;