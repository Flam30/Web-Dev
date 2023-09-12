var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/api/users', async function (req, res, next) {
    var user = new User(req.body);
    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
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

router.get('/api/users/:id', function(req, res, next){
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user)
    })
});

router.delete('/api/users/:id', function(req, res, next){
    console.log('here');
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user){
        if(err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    })
});

module.exports = router;