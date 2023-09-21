var express = require('express');
var router = express.Router();

var version1 = require('./v1');

router.use('/v1', version1);

module.exports = router;