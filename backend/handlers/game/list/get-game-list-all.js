const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	Game.find()
		.then((games) => {
			res.send(JSON.stringify(games));
		})
		.catch((err) => {
			res.status(400);
			res.send(JSON.stringify(err.message));
		});
};
