var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    id: {type: Number, unique: true, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    dateOfBirth: {type: Date}
});

module.exports = mongoose.model('customers', customerSchema);