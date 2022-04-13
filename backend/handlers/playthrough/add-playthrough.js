const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	if (!req.body.state) {
		res.send(JSON.stringify('Missing playthrough "state" field!'));
		return;
	}

	let parameters;

	if (req.body.game && req.body.game._id) {
		if (typeof req.body.game._id !== 'string') {
			req.status(400);
			req.send('game is not a string');
			return;
		}

		parameters = {_id: req.body.game._id};
	} else  {
		if (typeof req.body.title !== 'string') {
			req.status(400);
			req.send('title is not a string');
			return;
		}

		parameters = {title: req.body.title};
	}

	if (!parameters) {
		req.status(400);
		req.send('incorrect/missing "game" or "title" parameter!');
	}

	Game.findById(parameters)
		.catch((err) => {
			res.status(400);
			res.send(JSON.stringify(err.message));
		})
		.then((game) => {
			if (!game) {
				let error = new Error('Game was not found');
				error.responseStatus = 404;
				throw error;
			}
			
			return Playthrough.create({
				user: res.locals.user,
				game: game,
				state: req.body.state
			});
		})
		.catch((err) => {
			res.status(400);
			res.send(JSON.stringify(err.message));
		})
		.then((playthrough) => {
			if (!playthrough) {
				let error = new Error('Could not create playthrough!');
				error.responseStatus = 404;
				throw error;
			}
			playthrough.save();
			res.send(JSON.stringify(playthrough));
		})		
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});

};
