const mongoose = require('mongoose');
const Review = mongoose.model('review');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	let parameter;

	if (!req.body.score) {
		res.send('Missing score value!');
		return;
	}

	if (req.body.id) {
		parameter = {_id: req.body.id};
	} else if (req.body.title) {
		parameter = {title: req.body.title};
	}

	Review.findOne()
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

			return Review.create({
				user: res.locals.user,
				game: game,
				score: req.body.score,
			});
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
			res.send(err.message);
		});
};
