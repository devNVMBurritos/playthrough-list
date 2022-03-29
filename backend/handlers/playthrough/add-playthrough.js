const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	let parameters;

	if (!req.body.state) {
		res.send('Missing playthrough "state" field!');
		return;
	}

	if (req.body.id) {
		parameters = {_id: req.body.id};
	} else  {
		parameters = {title: req.body.title};
	}

	Game.findById(parameters)
		.then((game) => {
			if (!game) {
				let error = new Error('Game was not found');
				error.responseStatus = 404;
				throw error;
			}
			
			return Playthrough.create({
				user: res.locals.user,
				game: game,
			});
		})
		.then((playthrough) => {
			if (!playthrough) {
				let error = new Error('Could not create playthrough!');
				error.responseStatus = 404;
				throw error;
			}
			playthrough.save();
			res.send(JSON.stringify('Playthrough created!'));
		})		
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(err.message);
		});

};
