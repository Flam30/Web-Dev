var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    eventId: {type: Number},
    name: {type: String},
    ageLimit: {type: Number},
    date: {type: String}
});

module.exports = mongoose.model('events', eventSchema);