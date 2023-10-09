var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var customerSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
    dateOfBirth: Date
});

customerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('customers', customerSchema);