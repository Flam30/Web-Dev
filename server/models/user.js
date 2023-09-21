var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);