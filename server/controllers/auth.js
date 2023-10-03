var express = require('express');
var router = express.Router();
var Customer = require('./v1/customers');
var passport = require('passport');


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
            res.json({ success: false, message: "Your account could not be registered. Error: " + err });
        }
        else {
            req.login(customer, (er) => {
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

router.post("/login", function (req, res) {
    if (!req.body.username) {
        res.json({ success: false, message: "Missing username" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Missing password" })
    }
    else {
        passport.authenticate("local", function (err, customer, info) {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!customer) {
                    res.json({ success: false, message: "Username or password incorrect" });
                }
                else {
                    const token = jwt.sign({ customerId: customer._id, username: customer.username }, secretkey, { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful", token: token });
                }
            }
        })(req, res);
    }
});

module.exports = router;