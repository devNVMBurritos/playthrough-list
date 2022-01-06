const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	if (req.body.id) {
		const game = await Game.findById(req.body.id);
	} else if (req.body.title) {
		const game = await Game.findOne({
			title: req.body.title
		});
	}

	if (!game) {
		res.send('Game object was not found.');
		return;
	}

	if (req.body.description != null) {
		game.description = req.body.description
	}
	if (req.body.image != null) {
		game.image.imageLink = req.body.imageLink
	}
	if (req.body.title != null) {
		game.title = req.body.title
	}
	game.save();
	res.send('successfully updated parameters');
};
