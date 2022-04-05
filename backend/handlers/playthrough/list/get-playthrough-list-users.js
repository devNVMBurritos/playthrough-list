const mongoose = require('mongoose');
const Playthrough = mongoose.model('playthrough');

module.exports = async (req, res) => {

	Playthrough.find({
		user: res.locals.user,
	}).populate('game')
		.then((playthroughs) => {
			if(!playthroughs) {
				let error = new Error('User has no Playthroughs');
				error.responseStatus = 404;
				throw error;
			}

			res.send(JSON.stringify(playthroughs));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
