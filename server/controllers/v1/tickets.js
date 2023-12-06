var express = require('express');
var router = express.Router();
var Ticket = require('../../models/ticket');

// GET /tickets/:id - get a specific ticket
router.get('/:id', async function(req, res, next) {
    try {
        var ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId);
        if(ticket === null) {
            return res.status(404).json({'message': 'No such ticket found.'});
        }
        
        res.send(ticket);
    } catch (error) {
        next(error);
    }
});

module.exports = router;