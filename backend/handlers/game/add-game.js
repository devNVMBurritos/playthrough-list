const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	Game.create({
		title: req.body.title,
		imageLink: req.body.image,
		description: req. body.description
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
