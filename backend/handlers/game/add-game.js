const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	Game.create({
		title: req.body.title,
		imageLink: req.body.imageLink,
		description: req.body.description,
		promoted: req.body.promoted
	})
		.then((game) => {
			if (!game) {
				let error = new Error('Game object could not be created');
				error.responseStatus = 400;
				throw error;
			}

			game.save();
			res.send('Game added to database');
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(err.message);
		});

};
