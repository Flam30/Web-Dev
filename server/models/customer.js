var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
    _id: String,
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: String,
    phoneNumber: Number,
    DOB: Date,
    tickets: [{type: Schema.Types.ObjectId, ref: 'tickets'}]
});

module.exports = mongoose.model('customers', customerSchema);