var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    id: {type: String, unique: true, required: true},
    type: {type: String},
    seat: {type: String},
    price: {type: Number},
    availability: {type: Boolean},
    event: {type: Schema.Types.ObjectId, ref: 'event'}      // I had to remove the required: true because there was a validation error
    // customer: {type: Schema.Types.ObjectId, ref: 'customer'}
});

module.exports = mongoose.model('tickets', ticketSchema);