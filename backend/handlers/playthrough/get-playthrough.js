const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	let parameters;

	if (req.body.game && req.body.game._id) {
		if (typeof req.body.game._id !== 'string') {
			res.status(400);
			res.send('game is not a string');
			return;
		}

		parameters = {_id: req.body.game._id};
	} else  {
		if (typeof req.body.title !== 'string') {
			res.status(400);
			res.send('title is not a string');
			return;
		}

		parameters = {title: req.body.title};
	}

	if (!parameters) {
		res.status(400);
		res.send('incorrect/missing "game" or "title" parameter!');
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
				game: game._id
			});
		})
		.then((playthrough) => {
			if(!playthrough) {
				let error = new Error('Playthrough does not exist');
				error.responseStatus = 404;
				throw error;
			}

			res.send(JSON.stringify(playthrough));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
