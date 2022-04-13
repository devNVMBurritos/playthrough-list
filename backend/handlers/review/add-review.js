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

	if (!req.body.score) {
		res.send(JSON.stringify('Missing score value!'));
		return;
	}

	let parameters;

	if (req.body.game && req.body.game._id) {
		if (typeof req.body.game._id !== 'string') {
			req.status(400);
			req.send('game is not a string');
			return;
		}

		parameters = {_id: req.body.game._id};
	} else  {
		if (typeof req.body.title !== 'string') {
			req.status(400);
			req.send('title is not a string');
			return;
		}

		parameters = {title: req.body.title};
	}

	if (!parameters) {
		req.status(400);
		req.send('incorrect/missing "game" or "title" parameter!');
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
