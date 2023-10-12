var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var organizerSchema = new Schema({
    _id: String,
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: String,
    phoneNumber: Number,
    events: [{type: Schema.Types.ObjectId, ref: 'events'}]
});

module.exports = mongoose.model('organizers', organizerSchema);