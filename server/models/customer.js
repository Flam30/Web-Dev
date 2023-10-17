var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var customerSchema = new Schema({
    _id: String,
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: String,
    phoneNumber: Number,
    DOB: Date,
    tickets: [{type: String, ref: 'tickets'}]
});

customerSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('customers', customerSchema);