const mongoose = require('mongoose');
const Review = mongoose.model('review');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	if (!req.body.id && !req.body.title) {
		res.status(400);
		res.send(JSON.stringify('Missing parameter "id" or "title".'));
		
		return;
	}

	let parameter;
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

			res.send(JSON.stringify(review));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
