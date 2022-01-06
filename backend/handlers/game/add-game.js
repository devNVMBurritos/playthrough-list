const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
    game = await Game.create({
        title: req.body.title,
        imageLink: req.body.image,
        description: req. body.description
    });

    if (game != null) {
        game.save();
        res.send('Game added to database');
        return;
    }
    res.send('Game could not be added');
};
