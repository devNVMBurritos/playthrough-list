const mongoose = require('mongoose');
const Review = mongoose.model('review');
const Game = mongoose.model('game');

module.exports = async (req, res) => {	
	if (!req.body.id && !req.body.title) {
		res.status(400);
		res.send(JSON.stringify('Missing parameter "id" or "title".'));
		
		return;
	}
	
	let parameter;
	if (req.body.id) {
		parameter = {_id: req.body.id};
	}
	else if (req.body.title) {
		parameter = {title: req.body.title};
	}

	Game.findOne(parameter)
		.then((game) => {
			if (!game) {
				let error = new Error('Game was not found');
				error.responseStatus = 404;
				throw error;
			}

			return Review.deleteOne({
				user: res.locals.user,
				game: game,
			});
		})
		.then((deleteResponse) => {
			if (deleteResponse.deletedCount !== 1) {
				let error = new Error('Could not find review');
				error.responseStatus = 404;
				throw error;
			}

			res.send(JSON.stringify('deleted'));
		});
};
