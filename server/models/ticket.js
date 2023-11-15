var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ticketSchema = new Schema({
    id: {type: String, unique: true, required: true},
    price: {type: String, required: true},
    priceId: {type: String},
    quantity: {type: Number, required: true},
    event: {type: Schema.Types.String, ref: 'events', required: true}
});

module.exports = mongoose.model('tickets', ticketSchema);