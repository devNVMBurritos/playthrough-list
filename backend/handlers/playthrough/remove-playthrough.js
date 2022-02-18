const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	let game;
	if (req.body.id) {
		game = await Game.findById(req.body.id);
	} else if (req.body.title) {
		game = await Game.findOne({
			title: req.body.title
		});
	}

	if (!game) {
		res.send('Game does not exist');
		return;
	}

	Playthrough.deleteOne({
		user: res.locals.user,
		game: game,
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
			res.status(400);
			res.send(err);
		});
};
