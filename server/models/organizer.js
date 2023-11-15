var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var organizerSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: String,
    phoneNumber: Number,
    events: [{type: String, ref: 'events'}]
});

organizerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('organizers', organizerSchema);