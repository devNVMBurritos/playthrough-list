const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
    if (req.body.id) {
        const game = await Game.deleteOne({
            _id: req.body.id
        });
    } else if (req.body.title) {
        const game = await Game.deleteOne({
            title: req.body.title
        });
    }

    if (!game) {
        res.send('Game object was not found.');
        return;
    }
    res.send('Game deleted.');
};