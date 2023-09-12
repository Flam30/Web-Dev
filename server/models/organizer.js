var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizerSchema = new Schema({
    name: {type: String}
});

module.exports = mongoose.model('organizers', organizerSchema);