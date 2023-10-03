var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    // Idea - add image URL
    id: {type: String, unique: true, required: true},
    organizer: {type: Schema.Types.ObjectId, ref: 'organizers'},
    name: {type: String},
    venue: {type: Schema.Types.ObjectId, ref: 'venues'},
    ageLimit: {type: Number},
    date: {type: Date}
});

module.exports = mongoose.model('events', eventSchema);