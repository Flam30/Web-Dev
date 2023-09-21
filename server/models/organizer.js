var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizerSchema = new Schema({
    name: {type: String, unique: true, required: true},
    email: String,
    address: String,
    phoneNumber: String,
});

module.exports = mongoose.model('organizers', organizerSchema);