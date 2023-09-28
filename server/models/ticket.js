var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    id: {type: String, unique: true, required: true},
    type: {type: String},
    seat: {type: String},
    price: {type: Number},
    availability: {type: Boolean},
    event: {type: Schema.Types.ObjectId, ref: 'event', required: true}
    // customer: {type: Schema.Types.ObjectId, ref: 'customer'}
});

module.exports = mongoose.model('tickets', ticketSchema);