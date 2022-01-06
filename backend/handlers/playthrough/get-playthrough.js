const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const User = mongoose.model('user');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
  if (req.body.id) {
    const game = await Game.findById(req.body.id);
  } else if (req.body.title) {
    const game = await Game.findOne({
      title: req.body.title
    });
  }

  if (!game) {
    res.send('Game does not exist');
    return;
  }

  playthrough = await Playthrough.findOne({
    user: res.locals.user,
    game: game,
  });

  if (!playthrough) {
    res.send('Playthrough does not exists');
    return;
  }
  
  res.send(playthrough);
};
