var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: Number,
    name: String,
    mail: String,
    address: String,
    phoneNumber: String,
});

module.exports = mongoose.model('users', userSchema);