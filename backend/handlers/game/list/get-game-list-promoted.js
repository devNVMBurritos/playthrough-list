const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	Game.find({
		promoted: true
	}).limit(3)
		.then((data)=> {
			res.send(JSON.stringify(data));
		})
		.catch((err) => {
			res.status(400);
			res.send(err);
		});
};
