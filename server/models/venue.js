var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    location: {type: String},
    numberOfSeats: {type: Number}
});

module.exports = mongoose.model('venues', venueSchema);