const mongoose = require('mongoose');
const Review = mongoose.model('review');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	let game;
	if (req.body.id) {
		game = await Game.findById(req.body.id);
	} else if (req.body.title) {
		game = await Game.findOne({
			title: req.body.title
		});
	}

	if (!game) {
		res.send('Game does not exist');
		return;
	}

	Review.findOne({
		user: res.locals.user,
		game: game,
	})
		.then((review) => {
			if (!review) {
				res.send('Could not get review!');
				return;
			}

			res.send(review);
		});
};
