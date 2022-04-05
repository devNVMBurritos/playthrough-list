const mongoose = require('mongoose');
const Review = mongoose.model('review');

module.exports = async (req, res) => {

	Review.find({
		user: req.res.locals.user._id,
	}).populate('game')
		.then((reviews) => {
			if (!reviews) {
				let error = new Error('No reviews found!');
				error.responseStatus = 404;
				throw error;
			}

			res.send(JSON.stringify(reviews));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
