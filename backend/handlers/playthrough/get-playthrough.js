const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	let parameters;

	if (req.body.game) {
		parameters = {_id: req.body.game};
	} else if (req.body.title) {
		parameters = {
			title: req.body.title
		};
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
			res.send(err.message);
		});
};
