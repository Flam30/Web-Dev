var express = require('express');
var router = express.Router();
var Customer = require('../../models/customer');
var Ticket = require('../../models/ticket');
var passport = require('passport');
var jwt = require('jsonwebtoken');


// POST /customers/register - register a new customer
router.post("/register", function (req, res) {
    var customer = new Customer(req.body);
    customer._id = customer.username;
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

// POST /customers/login - login as a customer
router.post("/login", function (req, res, next) {
    if (!req.body.username) {
        res.status(400).json({ success: false, message: "Missing username" })
    }
    else if (!req.body.password) {
        res.status(400).json({ success: false, message: "Missing password" })
    }
    else {
        passport.authenticate("customerStrategy", function (err, customer, info) {
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

// POST /customers/:customerId/events/:eventId - add an event to the organizer
router.post('/:customerId/tickets/:ticketId', async function (req, res, next) {
    try {
        let customerUsername = req.params.customerId;
        let ticketId = req.params.ticketId;

        await Customer.find({username: customerUsername}, function (err, customer) {
            if (customer) {
                let ticket = Ticket.findById(ticketId);
                customer.tickets.push(ticket);
                customer.save(function (err, customer) {
                    res.status(200).json({message: 'Ticket added.'});
                });
            } else {
                res.status(404).json({ message: 'Customer does not exist.'});
            }
        });
    } catch (error) {
        next(error);
    }
});

// GET /customers - get all customers
router.get('/', async function(req, res, next) {
    try {
        const customers = await Customer.find({});
        if(customers.length === null) {
            return res.status(404).json({'message': 'No customers registered.'});
        }
        
        res.send(customers);
    } catch (error) {
        next(error);
    }
});

// GET /customers/:id - get a specific customer
router.get('/:id', async function(req, res, next) {
    try {
        var username = req.params.id;
        const customers = await Customer.find({username: username});
        if(customers.length === null) {
            return res.status(404).json({'message': 'No customers registered.'});
        }
        
        res.send(customers);
    } catch (error) {
        next(error);
    }
});

// PUT /customers/:id - update a specific customer
router.put('/:id', async function(req, res, next){
    try {
        const customer = await Customer.findOneAndReplace({username: req.params.id}, req.body, {new: true});
        if (customer === null) {
            return res.status(404).json({'message': 'Customer not found!'});
        }
        res.json(customer);
    } catch (err) {
        return next(err);
    }
});

// PATCH /customers/:id - update a specific field of a specific customer
router.patch('/:id', async function(req, res, next){
    try {
        const customer = await Customer.findOneAndUpdate({username: req.params.id}, req.body, {new: true});
        if (customer === null) {
            return res.status(404).json({'message': 'Customer not found!'});
        }
        res.json(customer);
    } catch (err) {
        return next(err);
    }
});

// DELETE /customers - delete all customers
router.delete('/', async function(req, res, next) {
    try {
        const customers = await Customer.find();
        if (customers === null) {
            return res.status(404).json({'message': 'No customers registered.'});
        }
        await Customer.deleteMany();
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

// DELETE /customer/:id - delete a specific customer
router.delete('/:id', async function(req, res, next) {
    try {
        var username = req.params.id;
        const customers = await Customer.find({username: username});
        if (customers === null) {
            return res.status(404).json({'message': 'No such customer registered.'});
        }
        await Customer.deleteOne({username: username});
        res.json("Successfully deleted.");
    } catch (error) {
        return next(error);
    }
});

module.exports = router;