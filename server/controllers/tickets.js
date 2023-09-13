var express = require('express');
var router = express.Router();
var Event = require('../models/ticket');

/*
    POST /organizers/:id/events/:id/tickets - add tickets to an event
    GET /organizers/:id/events/:id/tickets - get specific event's tickets
    GET /organizers/:id/events/:id/tickets/:id - get a specific ticket from an event
    DELETE /organizers/:id/events/:id/tickets/:id - delete a specific ticket from an event
*/