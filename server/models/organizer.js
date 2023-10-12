var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var organizerSchema = new Schema({
    name: {type: String, unique: true, required: true},
    email: String,
    address: String,
    phoneNumber: String,
});

organizerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('organizers', organizerSchema);