const mongoose = require('mongoose');
const Review = mongoose.model('review');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	if (!req.body.user) {
		res.status(400);
		res.send(JSON.stringify('user parameter is missing'));

		return;
	}

	if (!req.body.game) {
		res.status(400);
		res.send(JSON.stringify('game parameter is missing'));

		return;
	}

	let parameter;

	if (!req.body.score) {
		res.send(JSON.stringify('Missing score value!'));
		return;
	}

	if (req.body.game) {
		parameter = {_id: req.body.game};
	} else if (req.body.title) {
		parameter = {title: req.body.title};
	}

	Review.findOne({
		user: req.body.user,
		game: req.body.game
	})
		.then((review) => {
			if (review) {
				let error = new Error('Review already exists!');
				error.responseStatus = 400;
				throw error;
			}

			return 	Game.findOne(parameter);
		})
		.then((game) => {
			if (!game) {
				let error = new Error('Game was not found');
				error.responseStatus = 404;
				throw error;
			}
			const review = {
				user: res.locals.user._id,
				game: game._id,
				score: req.body.score,
				review: req.body.review
			};

			return Review.create(review);
		})
		.then((review) => {
			if (!review) {
				let error = new Error('Review could not be created');
				error.responseStatus = 400;
				throw error;
			}

			review.save();
			res.send(JSON.stringify('Review added!'));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
