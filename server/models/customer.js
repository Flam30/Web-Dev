var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
});

module.exports = mongoose.model('customers', customerSchema);