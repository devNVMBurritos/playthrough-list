const { application } = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = function (req, res, next) {
    if (res.locals.user.isAdmin || res.locals.user.roles.includes('game-moderator')) {
        next();
        return;
    }
    res.send('Unauthorized access!');
    return;
}