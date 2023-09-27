var express = require('express');
var router = express.Router();

var eventsV1 = require('./v1/events');
var organizersV1 = require('./v1/organizers');
var ticketsV1 = require('./v1/tickets');
var customersV1 = require('./v1/users');
var venuesV1 = require('./v1/venues');

router.use('/v1/events', eventsV1);
router.use('/v1/organizers', organizersV1);
router.use('/v1/././tickets', ticketsV1);
router.use('/v1/users', customersV1);
router.use('/v1/venues', venuesV1);

module.exports = router;