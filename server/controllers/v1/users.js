var express = require('express');
var router = express.Router();
var User = require('../../models/user');

router.get('/', async (req, res, next) => {
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

router.get('/:id', async function(req, res, next){
    try {
        const user = await User.findOne({username: req.params.id});
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

router.post('/', async function (req, res, next) {
    var user = new User(req.body);
    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async function(req, res, next){
    try {
        const user = await User.findOneAndReplace({username: req.params.id}, req.body, {new: true});
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

router.patch('/:id', async function(req, res, next){
    console.log('here');
    try {
        const user = await User.findOneAndUpdate({username: req.params.id}, req.body, {new: true});
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

router.delete('/', async function(req, res, next) {
    try {
        await User.deleteMany({});
        res.status(200).json();
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async function(req, res, next){
    try {
        const user = await User.findOneAndDelete({username: req.params.id}, req.body, {new: true});
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;