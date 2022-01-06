const mongoose = require('mongoose');
const Review = mongoose.model('review');
const User = mongoose.model('user');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
  if (req.body.id) {
    const game = await Game.findById(req.body.gameId);
  } else if (req.body.title) {
    const game = await Game.findOne({
      title: req.body.title
    });
  }
  if (!req.body.score) {
    res.send('Missing score value!');
    return;
  }
  if (!game) {
    res.send('Game does not exist');
    return;
  }

  review = await Review.create({
    user: res.locals.user,
    game: game,
    score: req.body.score
  });

  if (!review) {
    res.send('Could not create review!');
    return;
  }

  review.save();
  res.send('Game could not be added');
};
