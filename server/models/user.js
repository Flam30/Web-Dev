var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: Number,
    name: String,
    mail: String,
    address: String,
    phoneNumber: String,
    dateOfBirth: String
});

module.exports = mongoose.model('users', userSchema);