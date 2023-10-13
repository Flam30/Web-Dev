var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var venueSchema = new Schema({
    _id: String,
    id: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    capacity: {type: Number, required: true},
    location: {type: String, required: true}
});

module.exports = mongoose.model('venues', venueSchema);