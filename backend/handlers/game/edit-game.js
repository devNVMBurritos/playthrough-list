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

	Game.findById(parameters)
		.then((game) => {
			if (!game) {
				let error = new Error('Game object was not found.');
				error.responseStatus = 404;
				throw error;
			}
			if (req.body.description != null) {
				game.description = req.body.description;
			}
		
			if (req.body.image != null) {
				game.image.imageLink = req.body.imageLink;
			}
		
			if (req.body.title != null) {
				game.title = req.body.title;
			}

			if (req.body.promoted != null) {
				game.promoted = req.body.promoted;
			}
			
			game.save();
			res.send(JSON.stringify('successfully updated parameters'));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});

};
