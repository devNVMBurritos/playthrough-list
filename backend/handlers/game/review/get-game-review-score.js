const mongoose = require('mongoose');
const Game = mongoose.model('game');
const Review = mongoose.model('review');

module.exports = async (req, res) => {
	if (!req.body.id && !req.body.title) {
		res.status(400);
		res.send('Missing parameter "id" or "title".');
	}

	let parameters;
	if (req.body.id) {
		parameters = {_id: req.body.id};
	} else  {
		parameters = {title: req.body.title};
	}

	Game.findOne(parameters)
		.then((game) => {
			if (!game) {
				let error = new Error('Game object was not found.');
				error.responseStatus = 404;
				throw error;
			}
			return Review.aggregate([
				{ $match: { game: game._id }},
				{ $group: { _id: '$game', count:{ $count: {}}, score:{$avg: '$score' }}}
			]).exec();
		})
		.then((review) => { 
			if (!review) {
				let error = new Error('Review object was not found.');
				error.responseStatus = 404;
				throw error;
			}
			res.send(review); 
		})
		.catch((err) => {
			res.status(400);
			res.send(err.message);
		});

};
