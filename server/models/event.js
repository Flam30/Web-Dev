var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    id: {type: String, unique: true, required: true},
    organizer: {type: Schema.Types.ObjectId, ref: 'organizers', required: true},
    name: {type: String},
    venue: {type: Schema.Types.ObjectId, ref: 'venues', required: true},
    ageLimit: {type: Number},
    date: {type: Date}
});

module.exports = mongoose.model('events', eventSchema);