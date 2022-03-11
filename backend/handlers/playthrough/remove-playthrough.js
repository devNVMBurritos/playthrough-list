const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	let parameters;

	if (req.body.id) {
		parameters = {_id: req.body.id};
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

			return Playthrough.deleteOne({
				user: res.locals.user,
				game: game
			});
		})
		.then((deleteResponse) => {
			if (deleteResponse.deletedCount === 1) {
				res.send('deleted');
			} else {
				res.status(404);
				res.send('Could not find playthrough');
			}
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(err.message);
		});
};
