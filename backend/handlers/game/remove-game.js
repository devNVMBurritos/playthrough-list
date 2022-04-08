const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	if (!req.body.id && req.body.title) {
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

	Game.deleteOne(parameters)
		.catch((err) => {
			req.status(400);
			req.send(JSON.stringify(err.message));
		})
		.then((deleteResponse) => {
			if (deleteResponse.deletedCount !== 1) {
				let error = new Error('Game was not found');
				error.responseStatus = 404;
				throw error;
			}

			res.send(JSON.stringify('Game deleted!'));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});

};
