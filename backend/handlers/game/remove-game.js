const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {

	let parameters;
	if (req.body.id) {
		parameters = {_id: req.body.id};
	} else  {
		parameters = {title: req.body.title};
	}

	Game.deleteOne(parameters)
		.then((deleteResponse) => {
			if (deleteResponse.deletedCount === 1) {
				res.send('Game deleted!');
			} else {
				let error = new Error('Game was not found');
				error.responseStatus = 404;
				throw error;
			}
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(err.message);
		});

};
