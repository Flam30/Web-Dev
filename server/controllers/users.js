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

router.get('/api/users/:id', async function(req, res, next){
    var id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/users/:id', async function(req, res, next){
    console.log('here');
    var id = req.params.id;
    try {
        const user = await User.findOneAndDelete({_id: id});
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;