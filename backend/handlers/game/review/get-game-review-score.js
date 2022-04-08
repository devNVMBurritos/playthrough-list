const mongoose = require('mongoose');
const Game = mongoose.model('game');
const Review = mongoose.model('review');

module.exports = async (req, res) => {
	if (!req.body.id && !req.body.title) {
		res.status(400);
		res.send(JSON.stringify('Missing parameter "id" or "title".'));
		
		return;
	}

	let parameters;
	if (req.body.id) {
		if (typeof req.body.id !== 'string') {
			req.status(400);
			req.send(JSON.stringify('"id" must be a string')); 

			return;
		}

		parameters = {_id: req.body.id};
	} else  {
		if (typeof req.body.title !== 'string') {
			req.status(400);
			req.send(JSON.stringify('"title" must be a string')); 

			return;
		}

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
		.catch((err) => {
			res.status(400);
			res.send(JSON.stringify(err.message));
		})
		.then((review) => { 
			if (!review) {
				let error = new Error('Review object was not found.');
				error.responseStatus = 404;
				throw error;
			}
			res.send(JSON.stringify(review)); 
		})
		.catch((err) => {
			res.status(400);
			res.send(JSON.stringify(err.message));
		});

};
