const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
  if (req.body.id) {
    const game = await Game.findById(req.body.id);
  } else if (req.body.title) {
    const game = await Game.findOne({
      title: req.body.title
    });
  }

  if (!req.body.state) {
    res.send('Bad playthrough state input!');
    return;
  }

  if (!game) {
    res.send('Game does not exists');
    return;
  }

  const playthrough = await Playthrough.create({
    user: res.locals.user,
    game: game,
    state
  });

};
