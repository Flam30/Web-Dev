var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ticketSchema = new Schema({
    _id: String,
    id: {type: String, unique: true, required: true},
    seat: {type: String},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    customer: {type: Schema.Types.String, ref: 'customers'},
    event: {type: Schema.Types.String, ref: 'events', required: true}
});

module.exports = mongoose.model('tickets', ticketSchema);