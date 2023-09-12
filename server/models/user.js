var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId: {type: Number},
    name: {type: String},
    mail: {type: String},
    address: {type: String},
    phoneNumber: {type: String},
    dateOfBirth: {type: String}
});

module.exports = mongoose.model('users', userSchema);