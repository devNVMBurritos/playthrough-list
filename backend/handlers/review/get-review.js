const mongoose = require('mongoose');
const Review = mongoose.model('review');
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

  review = await Review.findOne({
    user: res.locals.user,
    game: game,
  });

  if (!review) {
    res.send('Could not get review!')
    return;
  }

  res.send(review);
};
