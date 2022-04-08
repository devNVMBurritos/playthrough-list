const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	if (!req.body.state) {
		res.send(JSON.stringify('Missing playthrough state value!'));

		return;
	}

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

		parameters = { _id: req.body.id };
	} else {
		if (typeof req.body.title !== 'string') {
			req.status(400);
			req.send(JSON.stringify('"title" must be a string')); 
			return;
		}

		parameters = { title: req.body.title };
	}

	Game.findOne(parameters)
		.then((game) => {
			if (!game) {
				let error = new Error('Game does not exist');
				error.responseStatus = 404;
				throw error;
			}
			return Playthrough.findOne({
				user: res.locals.user,
				game: game
			});
		})
		.then((playthrough) => {
			if (!playthrough) {
				let error = new Error('Playthrough does not exist');
				error.responseStatus = 404;
				throw error;
			}

			playthrough.state = req.body.state;
			playthrough.save();
			res.send(JSON.stringify('Playthrough edited!'));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
