var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    res.send(user);
});

router.get('/api/users', async (req, res, next) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(204).json({ 'message': 'No users' });
        }

        res.send(users);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;