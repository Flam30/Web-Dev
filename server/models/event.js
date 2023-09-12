var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    id: {type: Number, unique: true, required: true},
    organizer: {type: Schema.Types.ObjectId, ref: 'organizers', required: true},
    name: {type: String},
    ageLimit: {type: Number},
    date: {type: String}
});

module.exports = mongoose.model('events', eventSchema);