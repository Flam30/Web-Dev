var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    ticketId: {type: Number},
    type: {type: String},
    seat: {type: String},
    price: {type: Number},
    availability: {type: Boolean}
});

module.exports = mongoose.model('tickets', ticketSchema);