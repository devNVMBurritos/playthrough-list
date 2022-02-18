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

	if (!req.body.state) {
		res.send('Missing playthrough state value!');
		return;
	}

	if (!game) {
		res.send('Game does not exist');
		return;
	}

	Playthrough.findOne({
		user: res.locals.user,
		game: game,
	}).then((playthrough) => {
		if (!playthrough) {
			res.send('Playthrough not found!');
			return;
		}
    
		playthrough.state = req.body.state;
		playthrough.save();
		res.send('Playthrough edited!');
	}).catch((err) => {
		res.status(404);
		res.send(err);
	});
};
