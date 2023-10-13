var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var eventSchema = new Schema({
    _id: String,
    id: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    ageLimit: Number,
    date: {type: Date, required: true},
    venue: {type: Schema.Types.String, ref: 'venues', required: true},
    organizer: {type: Schema.Types.String, ref: 'organizers', required: true},
    imageURL: String
});

module.exports = mongoose.model('events', eventSchema);