var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
    id: {type: Number, unique: true, required: true},
    name: {type: String},
    location: {type: String},
    numberOfSeats: {type: Number}
});

module.exports = mongoose.model('venues', venueSchema);