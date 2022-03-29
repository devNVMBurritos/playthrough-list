const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	if (!req.body.id && !req.body.title) {
		res.status(400);
		res.send('Missing parameter "id" or "title".');

		return;
	}

	let parameters;
	if (req.body.id) {
		parameters = {_id: req.body.id};
	} else {
		parameters = {title: req.body.title};
	}
	

	Game.findById(parameters)
		.then((game) => {
			if (!game) {
				let error = new Error('Game object was not found.');
				error.responseStatus = 404;
				throw error;
			}

			res.send(JSON.stringify(game));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(err.message);
		});
};
