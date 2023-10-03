var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var session = require('express-session');
var history = require('connect-history-api-fallback');
// version 1 controllers
var customersControllerV1 = require('./controllers/v1/customers');
var eventsControllerV1 = require('./controllers/v1/events');
var organizersControllerV1 = require('./controllers/v1/organizers');
var venuesControllerV1 = require('./controllers/v1/venues');
var ticketsControllerV1 = require('./controllers/v1/tickets');

// password encoding
const password = encodeURIComponent("admin");

// Variables
var mongoURI = process.env.MONGODB_URI || `mongodb+srv://admin:${password}@cluster0.46ugdxm.mongodb.net/?retryWrites=true&w=majority`;
var port = process.env.PORT || 3000;
const User = require('./models/user');

// Connect to MongoDB
mongoose.connect(mongoURI).catch(function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
});

// app.use('/api', controllers);
app.use('/api/v1/customers', customersControllerV1);
app.use('/api/v1/events', eventsControllerV1);
app.use('/api/v1/organizers', organizersControllerV1);
app.use('/api/v1/venues', venuesControllerV1);
app.use('/api/v1/events/:eventId/tickets', ticketsControllerV1);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
