var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, uniques: true, required: true},
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
});

module.exports = mongoose.model('users', userSchema);