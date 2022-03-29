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
	}
	else if (req.body.title) {
		parameter = {title: req.body.title};
	}

	Game.findOne(parameter)
		.then((game) => {
			if (!game) {
				let error = new Error('Game was not found');
				error.responseStatus = 404;
				throw error;
			}

			return Review.findOne({
				user: res.locals.user,
				game: game,
			});
		})
		.then((review) => {
			if (!review) {
				let error = new Error('Review was not found');
				error.responseStatus = 404;
				throw error;
			}

			if (req.body.review) {
				review.review = req.body.review;
			}

			review.score = req.body.score;
			review.save();
			res.send(JSON.stringify('Review Modified!'));
		});
};
