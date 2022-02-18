const mongoose = require('mongoose');
const Review = mongoose.model('review');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	let game;
	if (req.body.id) {
		game = await Game.findById(req.body.gameId);
	} else if (req.body.title) {
		game = await Game.findOne({
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

	Review.create({
		user: res.locals.user,
		game: game,
		score: req.body.score
	})
		.then((review) => {
			if (!review) {
				res.status(400);
				res.send('Could not create review!');
				return;
			}

			review.save();
			res.send('Game added');
		})
		.catch((err) => {
			res.status(400);
			res.send(err);
		});
};
